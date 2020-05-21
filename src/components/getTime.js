const GetTime = (times) => {
    var d = new Date();
    var D = d.getDate(), M = d.getMonth() + 1, Y = d.getFullYear(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    var str = D + "/" + M + "/" + Y + " " + h + ":" + m + ":" + s + ":"
    var duration = Math.abs(new Date(str) - new Date(times));
    return duration;
}

export default GetTime;