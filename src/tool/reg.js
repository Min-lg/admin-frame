const regMobile = (value) => {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(value)
};
const checkIDCard = (value) => {
    var num = value.toUpperCase() || '';
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
    if (!reg.test(num)) {
        return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(
            /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re) || [];
        // 检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] +
            '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re) || [];
        // 检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" +
            arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            // 检验18位身份证的校验码是否正确。
            // 校验位按照ISO 7064:1983.MOD
            // 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4,
                2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9',
                '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (var i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
        }
    }
    return true;
}
const checkPassWord = (password) => {//密码必须包含数字和字母
    var str = password;
    if (str == null || str.length < 8) {
        return false;
    }
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (reg.test(str))
        return true;
}
/**
 * 
 * @param {fileType} type 
 * @returns {String} 文件格式
 */
const checkFileLegalType = (type) => {
    if (!type) return 'file'; //不附带文件类型的文件，按file处理
    if (['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].indexOf(type) != -1) return 'word' //word
    if (['application/pdf'].indexOf(type) != -1) return 'pdf' //pdf
    if (['application/x-zip-compressed', 'application/zip', 'application/x-rar'].indexOf(type) != -1) return 'zipper' //压缩包类型
    if (['application/vnd.ms-powerpoint'].indexOf(type) != -1) return 'powerpoint' //ppt
    if (['image/jpeg', 'image/png'].indexOf(type) != -1) return 'image' //图片类型
    if (['text/plain'].indexOf(type) != -1) return 'text' //文本类型
    if (['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].indexOf(type) != -1) return 'excel' //excel

    return 'file'; //不限制类型，只判断图标
}
export {
    regMobile,      //手机号正则
    checkIDCard,       //身份证号
    checkPassWord,      //验证密码
    checkFileLegalType, //验证上传文件类型
}