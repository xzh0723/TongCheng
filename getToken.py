import execjs
import time
from config import *

def get_antitoken():
    """
    获取antitoken参数，并更新与之配套的cookies中的'wangba'参数（哈哈，这个wangba就是时间戳，不同步拿不到数据）
    :return:
    """
    with open('get_antitoken.js', 'r') as f:
        js = f.read()

    timestamp = str(int(time.time() * 1000))
    cookies = headers['Cookie']
    cookies = cookies.replace('1559436801168', timestamp)

    ctx = execjs.compile(js)
    antitoken = ctx.call('get_antitoken', timestamp)
    print(f'全局antitoken参数：{antitoken}')

    return antitoken, cookies





#antitoken, cookies = get_antitoken()


#params = {
#    'antitoken': antitoken,
#    '_': str(int(time.time() * 1000))
#}

#headers.update({'Cookie': cookies})
#res = requests.get(CityListAPI, params=params, headers=headers).json()
#items = res['HotelCityList']
#cityList = []
#for item in items:
#        cityList.append(item)
#print(cityList)
#for city in cityList:
#    if '重庆' in city:
#        print(city[0])
#params = {
#    'cityid': cithId,
#    'comedate': comedate,
#    'leavedate': leavedate
#}
#doc = pq(res.text)
#TraceId = doc('#TraceId').attr('value')
#print(TraceId)