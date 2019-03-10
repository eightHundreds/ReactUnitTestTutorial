/**
 * 
 * 

    航空公司有如下规定：

    - 中国去欧美的航线所有座位都有食物供应。每个座位都可以播放电影
    - 中国去非欧美的国外航线都有食物供应，只有商务仓可以播放电影
    - 中国国内的航班的商务仓有食物供应，但是不可以播放电影
    - 中国国内的航班的经济仓除非飞行时间大于2小时就有食物供应，但是不可以播放电影 
 *
 * 
 * @param airLine {欧美|非欧美|国内} 航线 
 * @param space {经济舱|商务舱} 舱位 
 * @param during {number} 飞行时间(小时)
 * @returns Array<string> 可提供的服务
 */
function getServe(airLine, space, during) {
  const serveList = [];
  if (["欧美", "非欧美"].indexOf(airLine) >= 0 || (airLine==="国内" && (space === "商务舱" || during >= 2))) {
    serveList.push("食物");
  }
  if (airLine === "欧美" || (airLine==="非欧美" && space === "商务舱")) {
    serveList.push("电影");
  }
  return serveList;
}

export default getServe;
