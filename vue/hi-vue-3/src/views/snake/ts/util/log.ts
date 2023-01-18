export function lg(...data: any[]): void {
    let d = new Date;//生成日期
    let year = d.getFullYear();//取得年
    let month = d.getMonth() + 1;    //取得月,js从0开始取,所以+1
    let date1 = d.getDate(); //取得天
    let hour = d.getHours();//取得小时
    let minutes = d.getMinutes();//取得分钟
    let second = d.getSeconds();//取得秒
    let prefix = year + "-" + month + "-" + date1 + " " + hour + ":" + minutes + ":" + second + " "
    console.log(prefix, ...data)
}
