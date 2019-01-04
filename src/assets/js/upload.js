/**
 * 
 * @author DangTM R&D Department
 * @date May 5, 2017
 * @addr ELCOM-HCM
 * 
 */
import $ from "jquery";
! function (b) {
    b.fn.Upload = function (a) {
      let  options = "object" === typeof a && a;
        var c = b.extend({}, b.fn.Upload.defaults, options);
        a = b(this).attr("name");
        var e = c.fileOut,
            f = c.files,
            g = c.port || "3119";
        if (null != f && 0 < f.length) {
            for (var d = new FormData, h = 0; h < f.length; h++) d.append(a, f[h], e[h]);
            b.ajax({
                url: "http://".concat(c.ip, ":" + g + "/drive/upload"),
                type: "POST",
                data: d,
                processData: !1,
                contentType: !1,
                success: c.success,
                error: c.error,
                xhr: function () {
                    var a = new XMLHttpRequest;
                    a.upload.addEventListener("progress", c.progress, !1);
                    return a
                }
            })
        }
    };
    b.fn.UploadBlob = function (a) {
        options = "object" === typeof a && a;
        var c = b.extend({}, b.fn.Upload.defaults, options);
        b(this).attr("name");
        a = c.fileOut;
        var e = c.files,
            f = c.port || "3119";
        if (null != e && 0 < e.length) {
            for (var g = new FormData, d = 0; d < e.length; d++) g.append("file_upload", e[d], a[d]);
            b.ajax({
                url: "http://".concat(c.ip, ":" + f + "/drive/upload/blob"),
                type: "POST",
                data: g,
                processData: !1,
                contentType: !1,
                success: c.success,
                error: c.error,
                xhr: function () {
                    var a = new XMLHttpRequest;
                    a.upload.addEventListener("progress", c.progress, !1);
                    return a
                }
            })
        }
    };
    b.fn.UploadBase64 = function (a) {
        options = "object" === typeof a && a;
        a = b.extend({}, b.fn.Upload.defaults, options);
        0 == a.fileOut.length || null == a.files ? console.log("@author DangTM ELCOM --\x3e [ERROR] Somthing wrong with your data. files is code base64 and flieOut is full path") : b.ajax({
            url: "http://".concat(a.ip, ":" + a.port + "/drive/upload/base64"),
            type: "POST",
            data: JSON.stringify({
                base64: a.files,
                path: a.fileOut[0]
            }),
            contentType: "application/json",
            success: a.success,
            error: a.error
        })
    };
    b.fn.Upload.defaults = {
        ip: location.hostname,
        port: "3119",
        fileOut: ["FULL PATH SAVE FILE"],
        files: null,
        progress: function (a) {
            a.lengthComputable && (a = a.loaded / a.total, a = parseInt(100 * a), console.log(a + "%"), console.log.width(a + "%"), 100 === a && console.log("Upload Done"))
        },
        success: function (a) {
            console.log("@author DangTM ELCOM --\x3e Upload successful!\n" + a)
        },
        error: function () {
            console.log("Upload fail")
        }
    }
}($);