import time
import random
from scrapy import Selector
from getToken import get_antitoken
from config import *
import requests

class HotelSpider():

    def __init__(self, cityName):
        self.antitoken, self.cookies = get_antitoken()
        self.headers = headers
        self.headers.update({'Cookie': self.cookies})
        self.cityName = cityName

    def getCityList(self):
        """
        获取同程旅游酒店的所有城市ID
        :return:
        """
        params = {
            'antitoken': self.antitoken,
            '_': str(int(time.time() * 1000))
        }
        res = requests.get(CityListAPI, params=params, headers=self.headers).json()
        items = res['HotelCityList']
        cityList = []
        for item in items:
            cityList.append(item)
        print(f'cityList: {cityList}')
        return cityList

    def getCityId(self, cityList):
        """
        获取查询城市的ID
        :param cityList:
        :return:
        """
        for city in cityList:
            if self.cityName in city:
                cityId = city[0]
                return cityId

    def getTraceId(self, cityId):
        """
        进入酒店列表首页获取TraceId参数
        :return:
        """
        res = requests.get(BaseUrl.format(cityId), headers=headers)
        selector = Selector(text=res.text)
        TraceId = selector.css('#TraceId::attr(value)').extract_first()
        print(f'TraceId参数：{TraceId}')
        return TraceId

    def getHotelList(self, cityId, TraceId, page):
        """
        获取酒店列表
        :return:
        """
        data = {
            'CityId': cityId,
            #'BizSectionId': '0',
            #'SectionId': '0',
            #'Word': '',
            #'PriceRegion': '',
            #'Range': '',
            #'HotelStar': '',
            #'ChainId': '',
            #'HasStandBack': '0',
            #'Facilities': '',
            #'BreakFast': '',
            #'PayType': '',
            #'SortType': '0',
            #'Instant': '',
            #'LabelId': '0',
            #'WordType': '0',
            #'ThemeId': '',
            #'Latitude': '',
            #'Longitude': '',
            #'ComeDate': self.comeDate,
            #'LeaveDate': self.leaveDate,
            'PageSize': '20',
            'Page': page,
            'antitoken': self.antitoken,
            #'IsSeo': '0',
            'iid': random.random(),
            'TraceId': TraceId,
            #'HotelType': '0'
        }

        res = requests.post(HotelListAPI, data=data, headers=headers).json()
        # print(res.text)
        if res['Info'] == '获取成功':
            TotalCount = res['TotalCount']
            # print(f'酒店总数：{TotalCount}')
            TotalPage = res['TotalPage']
            # print(f'总页数：{TotalPage}')
            HotelList = res['HotelInfo']
            for hotel in HotelList:
                #print(hotel)
                self.parse(hotel)
            return TotalPage

    def parse(self, item):
        """
        解析酒店列表，清洗数据
        :param item:
        :return:
        """
        hotelInfo = {}
        field_map = {
            'Name': 'Name', 'Id': 'Id', 'CityName': 'CityName', 'CmtLabel': 'CmtLabel', 'CmtNum': 'CmtNum',
            'Credit': 'Credit', 'Grade': 'Grade', 'ImgUrl': 'ImgUrl', 'Instant': 'Instant', 'IsFullHouse': 'IsFullHouse',
            'IsRTPrice': 'IsRTPrice', 'KeyHotel': 'KeyHotel', 'MixedCmtNum': 'MixedCmtNum',
            'OriPrice': 'OriPrice', 'Pf': 'Pf', 'PfDesc': 'PfDesc', 'Price': 'Price', 'Section': 'Section',
            'BrandName': 'BrandName', 'BrandId': 'BrandId', 'Biz': 'Biz', 'LatestBook': 'LatestBook'
        }
        for field, attr in field_map.items():
            hotelInfo[field] = item[attr]
        hotelInfo['Address'] = Selector(text=item['Address']).css('.add::text').extract_first()
        hotelInfo['ClassId'] = item['PCHotelInfo']['ClassId']
        hotelInfo['ClassLevel'] = Selector(text=item['PCHotelInfo']['ClassLevel']).css('span::attr(title)').extract_first()
        hotelInfo['Tags'] = [tag for tag in Selector(text=item['PCHotelInfo']['IconHtml']).css('i::attr(title)').extract()]
        hotelInfo['ManYiDu'] = item['PCHotelInfo']['ManYiDu']
        hotelInfo['SectionId'] = item['PCHotelInfo']['SectionId']
        hotelInfo['ThemeLeft'] = {Selector(text=item['PCHotelInfo']['ThemeLeft']).css('strong::attr(title)').extract_first(): Selector(text=item['PCHotelInfo']['ThemeLeft']).css('strong::text').extract_first()}
        print(hotelInfo)
        return hotelInfo

    def main(self):
        cityList = self.getCityList()
        cityId = self.getCityId(cityList)
        TraceId = self.getTraceId(cityId)

        page = 1
        while True:
            print(f'正在抓取第{page}页')
            TotalPage = self.getHotelList(cityId, TraceId, str(page))
            if page > int(TotalPage):
                break
            else:
                page += 1
                time.sleep(random.random())

if __name__ == '__main__':
    cityName = input('请输入您要查询的城市>> ')
    spider = HotelSpider(cityName)
    spider.main()