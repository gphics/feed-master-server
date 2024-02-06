module.exports = (mixingRatio) => {
    const res = mixingRatio.split(":").map((elem) => +elem);
    return {data:res, err:null}
};
