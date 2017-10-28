/*! power by kodcloud ver4.24(2017-10-10) [build 1507617869905] */
define("app/src/app/main", ["lib/jquery-lib", "lib/util", "lib/artDialog/jquery-artDialog", "../../common/core", "../../common/rightMenuExtence", "../../app/appBase", "../../app/editor", "../../app/openWith", "../../app/html", "./page"], function(e) {
    e("lib/jquery-lib"), e("lib/util"), e("lib/artDialog/jquery-artDialog"), core = e("../../common/core"), App = e("./page"), core.init(), App.init()
}), define("app/common/core", ["./rightMenuExtence", "../app/appBase", "../app/editor", "../app/openWith", "../app/html"], function(require, exports) {
    tplUpload = require("./tpl/upload.html"), tplFormMake = require("./tpl/formMake.html");
    var tools = require("./core.tools"),
        upload = require("./core.upload"),
        api = require("./core.api"),
        playSound = require("./core.playSound"),
        formMake = require("./core.formMake");
    require("./rightMenuExtence"), kodApp = require("../app/appBase"), require("../app/editor"), require("../app/openWith"), require("../app/html"), pathHashEncode = function(e) {
        return hashEncode(e)
    }, pathHashDecode = function(e) {
        return hashDecode(e)
    };
    var initTemplate = function() {
            window.require = require, template.config || (template.config = function(e, t) {
                template.defaults[e] = t
            }, template.helper = function(e, t) {
                template.defaults.imports[e] = t
            }), template.config("escape", !1), template.config("compress", !0), template.helper("kod", {
                $: $,
                window: window,
                log: console.log,
                core: core,
                pathTools: window.pathTools,
                inArray: inArray
            }), template.defaults.imports.pathTools = window.pathTools, template.defaults.escape = !1, "_dev" == G.environment ? (template.defaults.cache = !1, template.defaults.minimize = !1, template.defaults.compileDebug = !0) : (template.defaults.cache = !0, template.defaults.minimize = !0, template.defaults.compileDebug = !1)
        },
        initFirst = function() {
            initTemplate(), "undefined" != typeof G && (1 != G.isRoot && $(".menu-system-setting").remove(), G.isRoot || core.authCheck("systemMember.get") || 1 == core.authCheck("systemGroup.get") || $(".menu-system-group").remove(), G.userConfig && "0" == G.userConfig.animateOpen && ($.dialog.defaults.animate = !1), resetHost()), $("html").bind("click", function(e) {
                if (0 == $(e.target).parents(".context-menu-list").length) try {
                    $.contextMenu.hidden()
                } catch (e) {}
            }), $("body").click(function() {
                ShareData.frameTop("", function(e) {
                    self != e && e.$("body").trigger("click")
                })
            }), $.dialog.defaults.animate && loadRipple(["a", "button", ".ripple-item", ".context-menu-item", "#picker", ".menuShareButton", ".menu-recycle-button", ".section .list"], [".disabled", ".disable", ".ztree", ".disable-ripple"]), $("a,img").attr("draggable", "false"), $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": Cookie.get("X-CSRF-TOKEN")
                }
            }), $(".common-footer [forceWap]").click(function() {
                var e = $(this).attr("forceWap");
                Cookie.set("forceWap", e), window.location.reload()
            }), core.setSkinDiy(), core.tools.init();
            for (var e = 0; window.kodReady.length > e; e++) try {
                window.kodReady[e]()
            } catch (t) {
                console.error("kodReady error:", t)
            }
            Hook.trigger("kodReady.end"), titleTips()
        },
        resetHost = function() {
            var e = window.location,
                t = e.port ? ":" + e.port : "";
            G.webHost = e.protocol + "//" + e.hostname + t + "/", G.appHost = rtrim(G.webHost, "/") + e.pathname.replace("index.php", "") + "index.php?", G.appRoot = rtrim(G.webHost, "/") + e.pathname.replace("index.php", ""), "1" == G.settings.paramRewrite && (G.appHost = G.appHost.replace("index.php?", "index.php/"))
        },
        titleTips = function() {
            isWap() || require.async(["lib/poshytip/jquery.poshytip.js", "lib/poshytip/skin.css"], function() {
                var e = $("[title]");
                e.poshytip({
                    className: "ptips-skin",
                    liveEvents: !0,
                    slide: !1,
                    alignTo: "cursor",
                    alignX: "right",
                    alignY: "bottom",
                    showAniDuration: 150,
                    hideAniDuration: 200,
                    offsetY: 10,
                    offsetX: 20,
                    showTimeout: function() {
                        var e = 1500;
                        return $(this).attr("title-timeout") && (e = parseInt($(this).attr("title-timeout"))), e
                    },
                    content: function() {
                        var e = $(this).data("title.poshytip");
                        if ($(this).attr("title-data")) {
                            var t = $($(this).attr("title-data"));
                            e = t.is("input") || t.is("textarea") ? t.val() : t.html()
                        }
                        return e = e ? e : "", e.replace(/\n/g, "<br/>")
                    }
                }), $("body").bind("mousedown", function() {
                    $(".ptips-skin").remove(), $.setStyle("body .ptips-skin{display:none !important;}", "ptips-title")
                }).bind("mouseup", function() {
                    $.setStyle("", "ptips-title")
                }), $("input,textarea").live("focus", function() {
                    $(e).poshytip("hide"), $(".ptips-skin").remove()
                })
            })
        };
    return {
        init: initFirst,
        serverDwonload: upload.serverDwonload,
        upload: upload.upload,
        uploadInit: upload.init,
        playSound: playSound.playSound,
        playSoundFile: playSound.playSoundFile,
        tools: tools,
        api: api,
        formMake: formMake,
        getPathIcon: function(e, t) {
            if (t = void 0 == t ? "" : t, "string" == $.type(e)) {
                var a = trim(trim(e), "/");
                if (e = {}, "{" != a.substring(0, 1) || a.split("/").length > 1) return {
                    icon: "",
                    name: ""
                };
                e.pathType = a.match(/\{.*\}/), e.id = a.split(":")[1]
            }
            var i = {};
            i[G.KOD_USER_SHARE] = {
                icon: "user-self",
                name: LNG.my_share
            }, i[G.KOD_GROUP_PATH] = {
                icon: "group-self-owner"
            }, i[G.KOD_GROUP_SHARE] = {
                icon: "group-guest"
            }, i[G.KOD_USER_SELF] = {
                icon: "user-self"
            }, i[G.KOD_USER_RECYCLE] = {
                icon: "recycle",
                name: LNG.recycle
            }, i[G.KOD_USER_FAV] = {
                icon: "tree-fav",
                name: LNG.fav
            }, i[G.KOD_GROUP_ROOT_SELF] = {
                icon: "group-self-root",
                name: LNG.my_kod_group
            }, i[G.KOD_GROUP_ROOT_ALL] = {
                icon: "group-root",
                name: LNG.kod_group
            };
            var n = i[e.pathType];
            return e.pathType == G.KOD_USER_SHARE && G.userID != e.id ? n = {
                icon: "user",
                name: t
            } : e.pathType == G.KOD_GROUP_PATH && "owner" == e.role && (n = {
                icon: "group-self-owner"
            }), void 0 == n && (n = {
                icon: "",
                name: ""
            }), void 0 == n.name && (n.name = t), n
        },
        isSystemPath: function(e) {
            var e = trim(trim(e), "/");
            if (void 0 == e || "{" != e.substring(0, 1) || e.split("/").length > 1) return !1;
            var t = e.match(/\{.*\}/),
                a = [G.KOD_USER_SHARE, G.KOD_GROUP_SHARE, G.KOD_USER_RECYCLE, G.KOD_USER_FAV, G.KOD_GROUP_ROOT_SELF, G.KOD_GROUP_ROOT_ALL];
            return -1 !== $.inArray(t[0], a) ? !0 : !1
        },
        pathPre: function(e) {
            if (e = trim(trim(e), "/"), void 0 == e || "{" != e.substring(0, 1)) return "";
            var t = e.match(/\{.*\}/);
            return t[0]
        },
        contextmenu: function(e) {
            try {
                $.contextMenu.hidden()
            } catch (t) {}
            var t = e || window.event;
            return t ? t && $(t.target).is("textarea") || $(t.target).is("input") || $(t.target).is("p") || $(t.target).is("pre") || 0 != $(t.target).parents(".can-right-menu").length || 0 != $(t.target).parents(".topbar").length || 0 != $(t.target).parents(".edit-body").length || 0 != $(t.target).parents(".aui-state-focus").length ? !0 : !1 : !0
        },
        pathThis: function(e) {
            if (!e || "/" == e) return "";
            var t = rtrim(this.pathClear(e), "/"),
                a = t.lastIndexOf("/"),
                i = t.substr(a + 1);
            if (0 == i.search("fileProxy")) {
                i = urlDecode(i.substr(i.search("&path=")));
                var n = i.split("/");
                i = n[n.length - 1], "" == i && (i = n[n.length - 2])
            }
            return i
        },
        pathClear: function(e) {
            if (!e) return "";
            var t = e.replace(/\\/g, "/");
            return t = t.replace(/\/+/g, "/"), t = t.replace(/\.+\//g, "/")
        },
        pathFather: function(e) {
            var t = rtrim(this.pathClear(e), "/"),
                a = t.lastIndexOf("/");
            return t.substr(0, a + 1)
        },
        pathExt: function(e) {
            var t = trim(e, "/");
            return -1 != t.lastIndexOf("/") && (t = t.substr(t.lastIndexOf("/") + 1)), -1 != t.lastIndexOf(".") ? t.substr(t.lastIndexOf(".") + 1).toLowerCase() : t.toLowerCase()
        },
        pathUrlEncode: function(e) {
            if (!e) return "";
            var t = urlEncode(e);
            return t = t.replace(/%2F/g, "/")
        },
        path2url: function(e, t) {
            if ("http" == e.substr(0, 4)) return e;
            void 0 == t && (t = !0);
            var a, i = this.pathClear(e);
            return G.isRoot && t && i.substring(0, G.webRoot.length) == G.webRoot ? a = G.webHost + this.pathUrlEncode(i.replace(G.webRoot, "")) : (a = G.appHost + "explorer/fileProxy&accessToken=" + G.accessToken + "&path=" + urlEncode(i), G.sharePage !== void 0 && (a = G.appHost + "share/fileProxy&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(i), i.substr(0, G.KOD_USER_SHARE.length) == G.KOD_USER_SHARE && (a = G.appHost + "share/fileProxy&path=" + urlEncode(i)))), a
        },
        pathCommon: function(e) {
            if ("http" == e.substr(0, 4)) return urlEncode(e);
            if (e.substr(0, G.KOD_USER_SHARE.length) == G.KOD_USER_SHARE) return urlEncode(e);
            var t = this.pathClear(e),
                a = urlEncode(t);
            return G.sharePage !== void 0 && (a = urlEncode(G.KOD_USER_SHARE + ":" + G.user + "/" + G.shareInfo.name + t)), a
        },
        isApp: function(e) {
            if ("undefined" == typeof Config) return !1;
            var t = Config.pageApp;
            return "string" == typeof e ? t == e : $.isArray(e) ? -1 !== $.inArray(t, e) ? !0 : !1 : !1
        },
        pathReadable: function(e) {
            if ("object" != typeof G.jsonData) return !0;
            for (var t = G.jsonData.fileList, a = 0; t.length > a; a++)
                if (t[a].path == e) return void 0 == t[a].isReadable || 1 == t[a].isReadable ? !0 : !1;
            t = G.jsonData.folderList;
            for (var a = 0; t.length > a; a++)
                if (t[a].path == e) return void 0 == t[a].isReadable || 1 == t[a].isReadable ? !0 : !1;
            return !0
        },
        pathCurrentWriteable: function() {
            return core.isApp("editor") ? !1 : G.jsonData.info ? G.jsonData.info.canUpload : !1
        },
        authCheck: function(e, t) {
            return G.isRoot ? !0 : AUTH.hasOwnProperty(e) && AUTH[e] ? !0 : (t && (t = t === !0 ? LNG.no_permission : t, Tips.tips(t, !1)), !1)
        },
        ajaxError: function(e, t, a) {
            console.log(e, t, a);
            var i = e.responseText,
                n = $.dialog.list.ajaxErrorDialog;
            return Tips.close(LNG.system_error, !1), "<!--user login-->" == i.substr(0, 17) ? (setTimeout(function() {
                var e = ShareData.frameTop();
                e.location.reload()
            }, 500), void 0) : (0 == e.status && "" == i && (i = "网络连接错误 (net::ERR_CONNECTION_RESET)，连接已重置<br/>请联系主机商或网管，检查防火墙配置！"), i = '<div class="ajaxError">' + i + "</div>", n ? n.content(i) : $.dialog({
                id: "ajaxErrorDialog",
                padding: 0,
                width: "60%",
                height: "50%",
                fixed: !0,
                resize: !0,
                ico: core.icon("error"),
                title: "ajax error",
                content: i
            }), void 0)
        },
        fileGet: function(e, t, a) {
            var i = "filename";
            "http" == e.substr(0, 4) && (i = "fileUrl");
            var n = G.appHost + "editor/fileGet&" + i + "=" + urlEncode(e);
            G.sharePage !== void 0 && (n = G.appHost + "share/fileGet&user=" + G.user + "&sid=" + G.sid + "&" + i + "=" + urlEncode(e)), (e.indexOf("editor/fileGet&") >= 0 || e.indexOf("share/fileGet&") >= 0) && (n = e), $.ajax({
                url: n,
                dataType: "json",
                error: function(e, t, i) {
                    core.ajaxError(e, t, i), "function" == typeof a && a()
                },
                success: function(e) {
                    e.code && "function" == typeof t && (1 == e.data.base64 && (e.data.content = base64Decode(e.data.content)), t(e.data.content, e, n)), e.code || "function" == typeof a && a(e.data)
                }
            })
        },
        fileInfo: function(e, t) {
            var a = G.appHost + "explorer/pathInfo";
            G.sharePage !== void 0 && (a = G.appHost + "share/pathInfo&user=" + G.user + "&sid=" + G.sid), $.ajax({
                url: a,
                type: "POST",
                dataType: "json",
                data: e,
                error: core.ajaxError,
                success: function(e) {
                    "function" == typeof t && t(e)
                }
            })
        },
        fileLink: function(e, t) {
            if (e = this.pathClear(e), G.isRoot && e.substring(0, G.webRoot.length) == G.webRoot) {
                var a = G.webHost + this.pathUrlEncode(e.replace(G.webRoot, ""));
                return "function" == typeof t && t(a), void 0
            }
            var i = 'dataArr=[{"type":"file","path":"' + urlEncode(e) + '"}]&viewPage=1';
            this.fileInfo(i, function(e) {
                var a = e.code ? e.data.downloadPath : !1;
                return a ? ("function" == typeof t && t(a), void 0) : (Tips.tips(LNG.no_permission_action + "==>" + LNG.group_role_pathinfo, !1), void 0)
            })
        },
        setting: function(e) {
            void 0 == e && (e = G.isRoot ? "system" : "user");
            var t = "85%",
                a = "85%";
            isWap() && (t = "100%", a = "100%"), ShareData.frameTop("Opensetting_mode") ? ShareData.frameTop("Opensetting_mode", function(t) {
                t.Setting.setGoto(e), $.dialog.list.setting_mode.display(!0)
            }) : $.dialog.open(G.appHost + "setting#" + e, {
                id: "setting_mode",
                fixed: !0,
                ico: core.icon("setting"),
                resize: !0,
                title: LNG.setting,
                width: t,
                height: t
            })
        },
        copyright: function() {
            var e = require("./tpl/copyright.html"),
                t = template.compile(e),
                a = ShareData.frameTop();
            a.art.dialog({
                id: "dialog-copyright",
                bottom: 0,
                right: 0,
                simple: !0,
                resize: !1,
                title: LNG.about,
                width: 425,
                padding: "0",
                fixed: !0,
                content: t({
                    LNG: LNG,
                    G: G
                })
            }), a.$(".dialog-copyright").addClass("animated-700 zoomIn")
        },
        qrcode: function(e, t) {
            "./" == e.substr(0, 2) && (e = G.appHost + e.substr(2));
            var a = G.appHost + "user/qrcode&url=" + quoteHtml(urlEncode(e)),
                i = "<a href='" + quoteHtml(e) + "' s='" + e + "' target='_blank'><img src='" + a + "' style='border:1px solid #eee;'/></a>";
            $.dialog({
                follow: t,
                fixed: !0,
                resize: !1,
                title: LNG.qrcode,
                padding: 30,
                content: i
            })
        },
        appStore: function() {
            var e = ShareData.frameTop();
            e.$.dialog.open(G.appHost + "app", {
                id: "app_store",
                fixed: !0,
                ico: core.icon("app-store"),
                resize: !0,
                title: LNG.app_store,
                width: "80%",
                height: "80%"
            })
        },
        openWindow: function(e, t, a, i) {
            t = t ? t : LNG.tips, a = a ? a : "80%", i = i ? i : "70%", isWap() && (a = "100%", i = "100%");
            var n = ShareData.frameTop(),
                o = n.$.dialog.open(e, {
                    ico: "",
                    title: t,
                    fixed: !0,
                    resize: !0,
                    width: a,
                    height: i
                });
            return o
        },
        openWindowFull: function(e, t) {
            return core.openWindow(e, t, "100%", "100%")
        },
        openWindowBig: function(e, t) {
            return core.openWindow(e, t, "90%", "90%")
        },
        openDialog: function(e, t, a, i) {
            if (e) {
                void 0 == i && (i = "openDialog" + UUID());
                var n = "<iframe frameborder='0' name='Open" + i + "' src='" + htmlEncode(e) + "' style='width:100%;height:100%;border:0;'></iframe>",
                    o = ShareData.frameTop(),
                    s = o.$.dialog({
                        id: i,
                        fixed: !0,
                        title: a,
                        ico: t,
                        width: "80%",
                        height: "75%",
                        padding: 0,
                        content: n,
                        resize: !0
                    });
                return s
            }
        },
        openApp: function(app) {
            if ("url" == app.type) {
                var icon = app.icon; - 1 == app.icon.search(G.staticPath) && "http" != app.icon.substring(0, 4) && (icon = G.staticPath + "images/file_icon/icon_app/" + app.icon), "number" != typeof app.width && -1 === app.width.search("%") && (app.width = parseInt(app.width)), "number" != typeof app.height && -1 === app.height.search("%") && (app.height = parseInt(app.height)), app.width || (app.width = "90%"), app.height || (app.height = "70%");
                var dialog_info = {
                        resize: app.resize,
                        fixed: !0,
                        ico: core.iconSrc(icon),
                        title: app.name.replace(".oexe", ""),
                        width: app.width,
                        height: app.height,
                        simple: app.simple,
                        padding: 0
                    },
                    top = ShareData.frameTop();
                "swf" == core.pathExt(app.content) ? (dialog_info.content = core.createFlash(app.content), top.$.dialog(dialog_info)) : top.$.dialog.open(app.content, dialog_info)
            } else {
                var exec = app.content;
                eval("{" + exec + "}")
            }
        },
        update: function() {
            setTimeout(function() {
                var e = base64Decode("Ly9zdGF0aWMua29kY2xvdWQuY29tL3VwZGF0ZS9tYWluNC5qcw==") + "?a=" + UUID();
                require.async(e, function(e) {
                    try {
                        e.todo("check")
                    } catch (t) {}
                })
            }, 200)
        },
        openPath: function(e) {
            core.isApp("explorer") ? ui.path.list(e, "tips") : core.explorer(e)
        },
        explorer: function(e, t) {
            void 0 == e && (e = ""), void 0 == t && (t = core.pathThis(e));
            var a = G.appHost + "explorer&type=iframe&path=" + e;
            G.sharePage !== void 0 && (a = G.appHost + "share/folder&type=iframe&user=" + G.user + "&sid=" + G.sid + "&path=" + e);
            var i = ShareData.frameTop(),
                n = i.$.dialog.open(a, {
                    className: "dialogExplorer",
                    resize: !0,
                    fixed: !0,
                    ico: core.icon("folder"),
                    title: t,
                    width: "80%",
                    height: "75%"
                }),
                o = 20 * i.$(".dialogExplorer").length;
            n.DOM.wrap.css({
                left: "+=" + o + "px",
                top: "+=" + o + "px"
            })
        },
        explorerCode: function(e) {
            void 0 == e && (e = "");
            var t = G.appHost + "editor&project=" + e;
            G.sharePage !== void 0 && (t = G.appHost + "share/codeRead&user=" + G.user + "&sid=" + G.sid + "&project=" + e), window.open(t)
        },
        setSkinFinished: function() {
            var e = $(".link-theme-loaded").attr("src");
            e && ($("#link-theme-style").attr("href", e), $(".link-theme-loaded").remove())
        },
        setSkin: function(e) {
            LocalData.set("theme", e), G.userConfig.theme = e;
            var t = G.staticPath + "style/skin/" + e + ".css?ver=" + G.version;
            t != $("#link-theme-style").attr("href") && $("body").append('<img src="' + t + '" onload="core.setSkinFinished();" onerror="core.setSkinFinished();" class="hidden link-theme-loaded">'), this.setSkinDiy()
        },
        setSkinDiy: function() {
            if (G.userConfig) {
                var e = LocalData.get("theme"),
                    t = "kodStyleDiy",
                    a = LocalData.getConfig(t);
                "object" != typeof a && "object" == typeof G.userConfig.themeDIY && (a = G.userConfig.themeDIY), "object" != typeof a && (a = {
                    bgBlur: 1,
                    bgImage: G.staticPath + "images/wall_page/9.jpg",
                    bgType: "color",
                    startColor: "#456",
                    endColor: "#000",
                    colorRotate: "200"
                }, LocalData.setConfig(t, a)), G.userConfig.themeDIY = a;
                var i = "";
                if ("diy" == e && a) {
                    var n = require("./tpl/themeDIY.html"),
                        o = template.compile(n);
                    i = o(a)
                }
                $.setStyle(i, t)
            }
        },
        editorFull: function() {
            var e = $("iframe[name=OpenopenEditor]");
            e.toggleClass("frame-fullscreen")
        },
        language: function(e) {
            Cookie.set("kodUserLanguage", e, 8760), window.location.reload()
        },
        fullScreen: function() {
            "true" == $("body").attr("fullScreen") && core.exitfullScreen(), $("body").attr("fullScreen", "true");
            var e = ShareData.frameTop(),
                t = e.document.documentElement;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullScreen && t.webkitRequestFullScreen()
        },
        exitfullScreen: function() {
            $("body").attr("fullScreen", "false"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        },
        createFlash: function(e, t, a) {
            var i = UUID();
            (a === void 0 || "" == a) && (a = i);
            var n = "";
            $.browser.msie && 9 > parseInt($.browser.version) && (n = 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"');
            var o = '<object type="application/x-shockwave-flash" class="' + i + '" ' + n + ' name="' + a + '" id="' + a + '" data="' + e + '" width="100%" height="100%" tabindex="-1" >' + '<param name="movie" value="' + e + '"/>' + '<param name="allowfullscreen" value="true" />' + '<param name="allowscriptaccess" value="always" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="flashvars" value="' + t + '" />' + '<param name="wmode" value="transparent" />' + '</object><div class="aui-loading" id="' + i + '_loading"><span>loading..</span></div>';
            return setTimeout(function() {
                var e = $("." + i);
                if (1 != e.length) {
                    var t = ShareData.frameTop();
                    e = t.$("." + i)
                }
                if (1 == e.length) var a = 0,
                    n = e[0],
                    o = setInterval(function() {
                        try {
                            a++, 100 == Math.floor(n.PercentLoaded()) ? (e.next(".aui-loading").remove(), clearInterval(o), o = null) : a > 100 && (e.next(".aui-loading").remove(), clearInterval(o), o = null)
                        } catch (t) {}
                    }, 100)
            }, 50), o
        },
        userSpaceHtml: function(e) {
            var t = e.split("/"),
                a = parseFloat(t[0]),
                i = 1073741824 * parseFloat(t[1]),
                n = pathTools.fileSize(parseFloat(t[0])),
                o = pathTools.fileSize(i),
                s = n + "/",
                r = 100 * a / i;
            r >= 100 && (r = 100);
            var l = "";
            return r >= 80 && (l = "warning"), 0 == i || isNaN(i) ? (s += LNG.space_tips_full, r = "0%") : (s += o, r += "%"), s = "<div class='space-info-bar'><div class='space-process'><div class='space-process-use " + l + "' style='width:" + r + "'></div></div>" + "<div class='space-info'>" + s + "</div>" + "</div>"
        },
        dateTime: function(e) {
            return date(LNG.time_type, e)
        },
        uploadCheck: function(e, t) {
            return t = void 0 == t ? !0 : t, "share" == G.sharePage ? "1" == G.shareInfo.canUpload : (void 0 == e && (e = "explorer.fileUpload"), !G.isRoot && AUTH.hasOwnProperty(e) && 1 != AUTH[e] ? (t && Tips.tips(LNG.no_permission, !1), !1) : G.jsonData && !G.jsonData.info.canUpload ? (t && (core.isSystemPath(G.thisPath) ? Tips.tips(LNG.path_can_not_action, !1) : Tips.tips(LNG.no_permission_write, !1)), !1) : !0)
        }
    }
}), define("app/common/tpl/upload.html", [], '<div class=\'file-upload-box\'>\n	<div class=\'topbar-nav\'>\n	   <a href=\'javascript:void(0);\' class=\'menu this tab-upload\'>{{LNG.upload_local}}</a>\n	   <a href=\'javascript:void(0);\' class=\'menu tab-download\'>{{LNG.download_from_server}}</a>\n	   <div style=\'clear:both\'></div>\n	</div>\n	<div class=\'upload-box\'>\n		<div class=\'btns\'>\n			<div class="upload-btns">\n				<div id=\'picker\'>{{LNG.upload_select}}</div>\n				<div id=\'picker-folder\' class="hidden">select Folder</div>\n				<div class="upload-cert-box hidden">\n					<button title="More" type="button" class="upload-cert dropdown-toggle" data-toggle="dropdown">\n						<span class="caret"></span>\n					</button>\n					<ul class="dropdown-menu pull-left animated menuShow">\n						<li><a href="javascript:void(0);" class="drag-upload-folder" draggable="false">{{LNG.folder}} {{LNG.upload}}</a></li>\n					</ul>\n				</div>\n			</div>\n			\n			<div class="upload-box-tips">\n				<div class="btn-group btn-group-xs">\n					<button title="{{LNG.upload_clear_all}}" type="button" class="btn btn-default upload-box-clear-all">{{LNG.upload_clear_all}}</button>\n					<button title="{{LNG.upload_clear}}" type="button" class="btn btn-default upload-box-clear">{{LNG.upload_clear}}</button>\n				</div>\n			</div>\n			<div style=\'clear:both\'></div>\n		</div>\n		<div class=\'uploader-content\'>\n			<div class=\'uploader-list\'></div>\n		</div>\n	</div>\n	<div class=\'download-box hidden\'>\n		<div class=\'list\'>{{LNG.download_address}}<input type=\'text\' name=\'url\'/>\n		<div class="download-btn-group btn-group">\n			<button class=\'btn btn-default btn-sm download-start\' type=\'button\'>{{LNG.download}}</button>\n			<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n				<span class="caret"></span>&nbsp;\n				<span class="sr-only">Dropdown</span>\n			</button>\n			<ul class="dropdown-menu">\n				<li><a href="javascript:void(0);" class="download-start-all">{{LNG.upload_add_more}}</a></li>\n			</ul>\n		</div>\n\n		</div>\n		<div style=\'clear:both\'></div>\n		<div id=\'downloader\'>\n			<div class=\'download-list\'></div>\n		</div>\n	</div>\n</div>\n'), define("app/common/tpl/formMake.html", [], '<div id="{{wrapID}}" class=\'config-box form-box can-select\n	{{if items.formStyle && items.formStyle.className}}{{items.formStyle.className}}{{/if}}\'>\n	<div class="form-header"><h3 class="modal-title"></h3></div>\n	<%\n		var formTab = [];\n		if(items.formStyle && kod.window.$.isArray(items.formStyle.tabs)){\n			formTab = items.formStyle.tabs;\n		}\n	%>\n	{{if formTab}}\n		<ul class="tab-group" role="tablist">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n					<li class="tab-item {{if tabIndex==0}}active{{/if}}">\n						<a href="javascript:void(0);" class="disable-ripple" draggable="false"\n						data-id="{{wrapID}}-{{tabIndex}}">{{tab.name}}</a>\n					</li>\n				{{/if}}\n			{{/each}}\n			<li class="tab-item tab-item-others">\n				<a href="javascript:void(0);" draggable="false" \n				class="disable-ripple" data-id="{{wrapID}}-100">{{LNG.others}}</a>\n			</li>\n		</ul>\n	{{/if}}\n\n	<div class="panel-body">\n	{{if formTab}}\n		<div class="tab-content">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n				<div class="tab-pane {{if tabIndex==0}}active{{/if}}" id="{{wrapID}}-{{tabIndex}}"></div>\n				{{/if}}\n			{{/each}}\n			<div class="tab-pane tab-others" id="{{wrapID}}-100"></div>\n		</div>		\n	{{/if}}\n\n	{{each items item key}}\n		<%\n			var tabCurrent = 100;\n			if(formTab){\n				for(var i=0;i<=formTab.length;i++){\n					if( formTab[i] && kod.window.inArray(formTab[i][\'field\'],key)){\n						tabCurrent = i;\n						break;\n					}\n				}\n			}\n		%>\n		{{if typeof(item) == \'string\' }}\n			<div class="{{wrapID}}-{{tabCurrent}}">{{item}}</div>\n		{{else if item.type == "html" || !item.type}}\n			{{if key != \'formStyle\'}}\n				<div class="{{wrapID}}-{{tabCurrent}}">\n					{{if item.value}}{{@item.value}}{{/if}}\n					{{if item.display}}{{@item.display}}{{/if}}\n					{{if item.desc}}{{@item.desc}}{{/if}}\n				</div>\n			{{/if}}\n		{{else}}\n			{{if item.value == undefined }}\n				{{if item.value = \'\'}}{{/if}}\n			{{/if}}\n			<div class="form-row form-{{item.type}} {{wrapID}}-{{tabCurrent}}\n				{{if items.className}}{{items.className}}{{/if}}"				\n				data-type="{{item.type}}" \n				data-value="{{item.value}}">\n				<div class="setting-title">\n					{{@item.display}}: {{if item.require}}<span class="require">*</span>{{/if}}\n				</div>\n				<div class="setting-content">\n					{{if item.type == \'input\'}}\n						<input type="text" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "textarea"}}\n						<textarea name="{{key}}">{{@item.value}}</textarea>\n					{{else if item.type == "password"}}\n						<input type="password" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "switch"}}\n						<label>\n							<input type="checkbox" class="kui-checkbox-ios size-big" name="{{key}}" \n								{{if item.value==1 }}checked="checked"{{/if}} /><em></em>\n								<i class="desc">&nbsp;{{if item.desc}}{{@item.desc}}{{/if}}</i>\n						</label>\n					{{else if item.type == "radio"}}\n						{{each item.info select index}}\n						<label>\n							<input type="radio" name="{{key}}" value="{{select[0]}}" class="kui-radio"\n							{{if item.value==select[0]}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "checkbox"}}\n						<%\n							var valArrCheckbox = [];\n							if(typeof(item.value) == \'string\'){\n								valArrCheckbox = item.value.split(\',\');\n							}\n						%>\n						{{each item.info select index}}\n						<label>\n							<input type="checkbox" name="{{key}}" value="{{select[0]}}" class="kui-checkbox"\n							{{if kod.window.inArray(valArrCheckbox,select[0])}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "select"}}\n						<select name="{{key}}">\n							{{each item.info select index}}\n							<option value="{{select[0]}}"\n							 {{if item.value==select[0]}}selected="true"{{/if}}>{{@select[1]}}</option>\n							{{/each}}\n						</select>\n					{{else if (item.type == "selectMutil" || item.type == "tags")}}\n						<%\n							var valArrSelect = [];\n							if(typeof(item.value) == \'string\'){\n								valArrSelect = item.value.split(\',\');\n							}\n							if(item.type == \'tags\'){\n								item.info = [];\n								for(var i=0;i<valArrSelect.length;i++)\n								item.info.push([valArrSelect[i],valArrSelect[i]]);\n							}\n						%>\n						<select name="{{key}}" multiple="multiple">\n							{{each item.info select index}}\n								<option value="{{select[0]}}"\n									{{if kod.window.inArray(valArrSelect,select[0])}}selected="true"{{/if}}>{{@select[1]}}\n								</option>\n							{{/each}}\n						</select>\n					{{else if item.type == "number"}}\n						{{if !item.info && (item.info = {from:\'\',to:\'\',step:1}) }}{{/if}}\n						<input type="number" name="{{key}}" value="{{item.value}}" \n							step="{{item.info.step}}" min="{{item.info.from}}" max="{{item.info.to}}"/> \n					{{else if item.type == "slider"}}\n						{{if !item.info && (item.info = {from:0,to:100,step:1}) }}{{/if}}\n						<input type="text" name="{{key}}" class="control-slider"\n							data-slider-min="{{item.info.from}}"\n							data-slider-max="{{item.info.to}}"\n							data-slider-step="{{item.info.step}}"\n							data-slider-value="{{item.value}}"/>\n					{{else if item.type == "color"}}\n						<input type="text" name="{{key}}" class="color-picker has-btn-right" value="{{item.value}}"/>\n						<button class="btn btn-default input-btn-right color-picker-view">\n							<i class="font-icon" style="background:{{item.value}}"></i>\n						</button>\n					{{else if item.type == "dateTime"}}\n						<input type="text" name="{{key}}" class="has-btn-right" \n							value="{{item.value}}" data-format="{{item.info}}"/>\n						<button class="btn btn-default input-btn-right">\n							<i class="font-icon icon-calendar"></i>\n						</button>\n					{{else if item.type == "fileSelect"}}\n						<input type="text" name="{{key}}" value="{{item.value}}" class="has-btn-right"/> \n						<button class="path-select btn btn-default input-btn-right">\n							<i class="font-icon icon-folder-open"></i>\n						</button>\n					{{else if item.type == "userSelect"}}\n						<% \n							var valueArr = {"all":"0","user":"","group":"","role":""};\n							if(typeof(item.value) == \'string\'){\n								userTypeArr = item.value.split(\';\');\n								for(var i = 0;i<userTypeArr.length;i++){\n									var splitArr = userTypeArr[i].split(\':\');\n									if(splitArr.length == 2){\n										valueArr[splitArr[0]] = splitArr[1];\n									}\n								}\n								if(!valueArr.user && !valueArr.group && !valueArr.role){\n									valueArr.all = \'1\';\n								}\n							}\n						%>\n						<input type="hidden" name="{{key}}" value="{{item.value}}"/>\n						<div class="btn-group btn-group-sm" data-json=\'{{kod.window.jsonEncode(valueArr)}}\'\n							{{if !item.info || item.info.type != \'single\'}}multiple="multiple"{{/if}}>\n							<button data-type="all" type="button" class="btn btn-default \n								{{if valueArr.all == "1"}}btn-active{{/if}}">{{LNG[\'Plugin.config.authAll\']}}</button>\n							<button data-type="user" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.user}}btn-active{{/if}}">{{LNG[\'Plugin.config.authUser\']}}</button>\n							<button data-type="group" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.group}}btn-active{{/if}}">{{LNG[\'Plugin.config.authGroup\']}}</button>\n							<button data-type="role" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.role}}btn-active{{/if}}">{{LNG[\'Plugin.config.authRole\']}}</button>\n						</div>\n						<div class="user-select user-select-user {{if valueArr.all == "1" || !valueArr.user}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.user}}</div>\n							<select data-value="{{valueArr.user}}" data-server="user"\n								{{if !item.info || item.info.user != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-group {{if valueArr.all == "1" || !valueArr.group}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.group}}</div>\n							<select data-value="{{valueArr.group}}" data-server="group"\n								{{if !item.info || item.info.group != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-role {{if valueArr.all == "1" || !valueArr.role}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.system_member_role}}</div>\n							<select data-value="{{valueArr.role}}" data-server="role"\n								{{if !item.info || item.info.role != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n					{{else if item.type == "group"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="group"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "role"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="role"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "user"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="user"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{/if}}\n\n					{{if item.type == "switch"}}\n					{{else if !item.desc}}\n						<!-- 注释 -->\n						<i class="desc">&nbsp;</i>\n					{{else if kod.inArray([\'userSelect\'],item.type)}}\n						<div class="desc">{{@item.desc}}</div>\n					{{else}}\n						<i class="desc">{{@item.desc}}</i>\n					{{/if}}\n				</div>\n				<div class="clear"></div>\n			</div>\n		{{/if}}\n	{{/each}}\n	</div>\n</div>\n\n'), define("app/common/core.tools", [], function(e) {
    var t = ["A", "versionHash", "undefined", "@dfq[-)&*^*%(_90", "decode", "length", "substr", "O", "P", "Q", "R", "S", "T", "inArray", "./?user/versionInstall", "6K2m5ZGKLOivt_aWLv_aaTheiHquS_bruaUueeJiOadgzvlpoLmnInpnIDopoHor7fogZTns7votK3kubDvvIFlbWFpbDprb2RjbG91ZEBxcS5jb20_c", "lang", "zh-CN", "V2FybmluZywgcGxlYXNlIGRvIG5vdCBtb2RpZnkgdGhlIGNvcHlyaWdodDsgaWYgbmVjZXNzYXJ5LCBwbGVhc2UgY29udGFjdCB0byBidXkhIEVtYWlsOiBrb2RjbG91ZEBxcS5jb20_c", "loading", "hide", "#messageTips .tips_close,#messageTips img", "tips", "href", "location", "2e58_39zGFQQvZkUjLjOxETXSuDqVatVhp88rJSmGpzzKi6SsasHHg", "sa", "b40aPuaqudWqmyWvpumbcMMGpVCdhjUCKq9oIN5G8o4yWb93Ww", "#2", "explorer", "isApp", "kod_power_by", "copyright_pre", "copyright_contact", "copyright_desc", "copyright_info", "html", ".common-footer", "", "toLowerCase", "search", "log", "free", "1", "2", "3", "4", "5", "6", "version_vip_", '<span class="version-vip" id="', '"><i class="font-icon icon-key"></i>', "</span>", ".menu-system-about", "insertAfter", "click", "id", "attr", "version_vip_free", "versionUpdateVip", "openWindow", '<div class="version-license"><a class="line" href="', '">激活授权</a></div>', "append", ".aui-content", "find", "wrap", "DOM", "text", "live", "die", ".version-vip", "top", "longPress", "support-space-not", "addClass", "body", "remove", ".menu-system-about,.menu-left #about", "#programs .setting_about,#programs .setting_homepage,#programs .home_page", "icon", "http", "iconSrc", '<i class="x-item-file x-', " small", '"></i>', "iconSmall", '<img src="', '" draggable="false" ondragstart="return false;">', "ff1fKBGuFL288VJ6eJj4CG6iesqwArC2YYSJMsa11yGAuUZlQRttbA_H4nSm3Hp-iCxzvn6AA4LLWN13cZ-cmdF6", "s1", "?a=", "todo", "async", "versionType", "Ly9rb2RjbG91ZC5jb20vYnV5Lmh0bWwj", "group", "data"],
        a = function() {
            var e = t[0];
            if (typeof G[t[1]] == t[2]) return e;
            var a = t[3],
                i = authCrypt[t[4]](G[t[1]], a);
            return i && 27 == i[t[5]] ? (e = i[t[6]](10, 1), -1 === $[t[13]](e, [t[0], t[7], t[8], t[9], t[10], t[11], t[12]]) && (e = t[0]), e) : e
        },
        i = a(),
        n = t[14],
        o = function() {
            var e = hashDecode(t[15]);
            G[t[16]] != t[17] && (e = hashDecode(t[18])), alert(e), Tips[t[19]](e, !1), $(t[21])[t[20]](), setTimeout(function() {
                Tips[t[22]](e, !1), window[t[24]][t[23]] = n
            }, 1e3 * roundFromTo(30, 60))
        },
        s = authCrypt[t[4]](t[25], t[26]),
        r = authCrypt[t[4]](t[27], t[28]),
        l = function() {
            if (core[t[30]](t[29]) && i == t[0])
                for (var e = [LNG[t[31]], LNG[t[32]], LNG[t[33]], LNG[t[34]], LNG[t[35]], $(t[37])[t[36]]()], a = 0; e[t[5]] > a; a++) {
                    e[a] || (e[a] = t[38]);
                    var n = e[a][t[39]]();
                    if (-1 == n[t[40]](s) && -1 == n[t[40]](r)) {
                        console[t[41]](n, s, r), setTimeout(function() {
                            o()
                        }, roundFromTo(300, 5e3));
                        break
                    }
                }
        },
        c = function() {
            var e = {
                    A: t[42],
                    O: t[43],
                    P: t[44],
                    Q: t[45],
                    R: t[46],
                    S: t[47],
                    T: t[48]
                },
                a = t[49] + e[i],
                o = t[50] + a + t[51] + LNG[a] + t[52];
            i == t[0] && $(o)[t[54]](t[53]), $(t[71])[t[70]](t[55])[t[69]](t[55], function() {
                if ($(this)[t[57]](t[56]) == t[58]) {
                    var e = core[t[60]](core[t[59]]),
                        a = t[61] + n + t[62];
                    e[t[67]][t[66]][t[65]](t[64])[t[63]](a)
                } else Tips[t[22]]($(this)[t[68]]())
            }), $(t[71])[t[73]](function() {
                window[t[72]][t[24]][t[23]] = n
            })
        },
        d = function() {
            i == t[0] && $(t[76])[t[75]](t[74]), -1 !== $[t[13]](i, [t[7], t[8], t[9], t[10], t[11], t[12]]) && ($(t[78])[t[77]](), $(t[79])[t[77]]())
        },
        p = function() {
            core[t[80]] = function(e, a) {
                return e[t[6]](0, 4) == t[81] ? core[t[82]](e) : t[83] + e + (a ? t[84] : t[38]) + t[85]
            }, core[t[86]] = function(e) {
                return core[t[80]](e, !0)
            }, core[t[82]] = iconSrc = function(e) {
                return t[87] + e + t[88]
            }, setTimeout(function() {
                var a = authCrypt[t[4]](t[89], t[90]) + t[91] + UUID();
                e[t[93]](a, function(e) {
                    try {
                        e[t[92]]()
                    } catch (a) {}
                })
            }, 2e3), core[t[94]] = i, core[t[59]] = hashDecode(t[95]) + G[t[16]], l(), c(), d()
        },
        u = function(e) {
            return i == t[0] && -1 == e[t[39]]()[t[40]](s) ? (o(), !1) : !0
        },
        f = function(e, a) {
            var n, o, s = {
                    A: 1,
                    O: 5,
                    P: 20,
                    Q: 40,
                    R: 100,
                    S: 1e3,
                    T: 1e3
                },
                r = {
                    A: 5,
                    O: 15,
                    P: 50,
                    Q: 150,
                    R: 500,
                    S: 1e3,
                    T: 1e3
                },
                l = [],
                c = 1;
            if (a == t[96] ? (n = e[t[97]], o = s[i]) : (n = e[t[97]], o = r[i]), 1e3 == o) l = n;
            else
                for (var d in n) {
                    if (c > o) break;
                    l[d] = n[d], c++
                }
            return l
        },
        h = {
            init: p,
            about: u,
            systemData: f
        };
    return h
}), define("app/common/core.upload", [], function(e) {
    var t = function() {
        var e = G.appHost + "explorer/fileUpload";
        return "share" == G.sharePage && "1" == G.shareInfo.canUpload && (e = G.appHost + "share/fileUpload&user=" + G.user + "&sid=" + G.sid), e
    };
    return {
        serverDwonload: function(e, t) {
            if (!core.uploadCheck("explorer.serverDownload")) return !1;
            var i = $(".download-box"),
                n = i.find(".download-list");
            if (i.find("input").val(""), !e) return Tips.tips("url false!", !1), void 0;
            if ("share" == G.sharePage) return Tips.tips(LNG.no_permission_action, !1), void 0;
            "ftp" != e.substr(0, 3) && "http" != e.substr(0, 4) && (e = "http://" + e);
            var o = UUID(),
                s = '<div id="' + o + '" class="item">' + '<div class="info"><span class="title" tytle="' + e + '">' + core.pathThis(e) + "</span>" + '<span class="size">0b</span>' + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
            n.find(".item").length > 0 ? $(s).insertBefore(n.find(".item:eq(0)")) : n.append(s);
            var r, l, c, d = 0,
                p = $("#" + o),
                u = $("#" + o + " .state").text(LNG.download_ready),
                f = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%;text-align:right;"></div></div>').appendTo("#" + o).find(".progress-bar");
            $("#" + o + " .remove").bind("click", function() {
                clearInterval(r), r = !1, clearTimeout(l), l = !1, $.get(G.appHost + "explorer/serverDownload&type=remove&uuid=" + o), $(this).parent().parent().slideUp(function() {
                    $(this).remove(), ui.f5()
                })
            });
            var h, m = function(e) {
                    clearTimeout(h), h = !1, h = setTimeout(function() {
                        ui.f5Callback(function() {
                            ui.path.setSelectByFilename(e)
                        })
                    }, 600)
                },
                v = function() {
                    $.ajax({
                        url: G.appHost + "explorer/serverDownload&type=download&savePath=" + t + "&url=" + urlEncode(e) + "&uuid=" + o + "&time=" + time(),
                        dataType: "json",
                        error: function(e, t, i) {
                            var n = p.data("progcess");
                            return 200 != a.status && n && n.supportRange ? (setTimeout(function() {
                                v()
                            }, 1e3), void 0) : (core.ajaxError(e, t, i), 200 == a.status && (clearInterval(r), r = !1, clearTimeout(l), l = !1, f.parent().remove(), u.addClass("error").text(LNG.download_error)), void 0)
                        },
                        success: function(e) {
                            return 0 == e.code && "downloading" == e.data ? (setTimeout(function() {
                                v()
                            }, 1e3), void 0) : (e.code ? (m(e.info), u.text(LNG.download_success), $("#" + o + " .info .title").text(core.pathThis(e.info)), $("#" + o + " .info .title").attr("title", e.info), u.parent().parent().addClass("success")) : (u.addClass("error").text(e.data), u.parent().parent().addClass("error")), clearInterval(r), r = !1, clearTimeout(l), l = !1, f.parent().remove(), void 0)
                        }
                    })
                };
            v();
            var g = function() {
                $.ajax({
                    url: G.appHost + "explorer/serverDownload&type=percent&uuid=" + o,
                    dataType: "json",
                    success: function(e) {
                        var t = "",
                            a = e.data;
                        if (r) {
                            if (!e.code) return u.text(LNG.loading), void 0;
                            if (a) {
                                if (a.size = parseFloat(a.size), a.time = parseFloat(a.time), c) {
                                    var i = a.size - c.size,
                                        n = i / (a.time - c.time);
                                    if (d > .2 * n) {
                                        var o = d;
                                        d = n, n = o
                                    } else d = n;
                                    var s = pathTools.fileSize(n);
                                    s = s ? s : 0, t = s + "/s"
                                }
                                if (p.data("progcess", a), 0 == a.length) p.find(".progress-bar").css("width", "100%"), u.text(t), p.find(".size").text(pathTools.fileSize(a.size));
                                else {
                                    var l = 100 * (a.size / a.length);
                                    p.find(".progress-bar").css("width", l + "%"), u.text(l.toFixed(1) + "%(" + t + ")"), p.find(".size").text(pathTools.fileSize(a.length))
                                }
                                p.find(".title").text(a.name), c = a
                            }
                        }
                    }
                })
            };
            l = setTimeout(function() {
                g(), r = setInterval(function() {
                    g()
                }, 1e3)
            }, 100)
        },
        upload: function() {
            $(".dialog-file-upload").show();
            var e = t();
            if (uploader.option("server", e), uploader.option("method", "POST"), 0 != $(".dialog-file-upload").length) return $.dialog.list["dialog-file-upload"].display(!0), void 0;
            var a = template.compile(tplUpload);
            $.dialog({
                padding: 5,
                width: 430,
                height: 450,
                resize: !0,
                ico: core.icon("upload"),
                id: "dialog-file-upload",
                fixed: !0,
                title: LNG.upload_muti,
                content: a({
                    LNG: LNG
                }),
                close: function() {
                    $.each(uploader.getFiles(), function(e, t) {
                        uploader.skipFile(t), uploader.removeFile(t)
                    }), $.each($(".download-list .item"), function() {
                        $(this).find(".remove").click()
                    })
                }
            }), $(".file-upload-box .topbar-nav a.menu").unbind("click").bind("click", function() {
                $(this).hasClass("tab-upload") ? ($(".file-upload-box .tab-upload").addClass("this"), $(".file-upload-box .tab-download").removeClass("this"), $(".file-upload-box .upload-box").removeClass("hidden"), $(".file-upload-box .download-box").addClass("hidden")) : ($(".file-upload-box .tab-upload").removeClass("this"), $(".file-upload-box .tab-download").addClass("this"), $(".file-upload-box .upload-box").addClass("hidden"), $(".file-upload-box .download-box").removeClass("hidden"))
            }), $(".download-box [name=url]").keyEnter(function() {
                core.serverDwonload($(".download-box input").val(), G.thisPath)
            }), $(".file-upload-box .download-box .download-start").unbind("click").bind("click", function() {
                core.serverDwonload($(".download-box input").val(), G.thisPath)
            }), $(".file-upload-box .download-box .download-start-all").unbind("click").bind("click", function() {
                $.dialog({
                    id: "server-dwonload-textarea",
                    fixed: !0,
                    resize: !1,
                    ico: core.icon("upload"),
                    width: "420px",
                    height: "270px",
                    padding: 10,
                    title: LNG.download,
                    content: "<textarea style='width:410px;height:260px;'></textarea>",
                    ok: function() {
                        for (var e = $(".server-dwonload-textarea textarea").val().split("\n"), t = 0; e.length > t; t++) core.serverDwonload(e[t], G.thisPath)
                    }
                })
            }), uploader.addButton({
                id: "#picker"
            }), uploader.addButton({
                id: "#picker-folder"
            }), $.supportUploadFolder() && ($(".upload-cert-box").removeClass("hidden"), $(".file-upload-box .drag-upload-folder").unbind("click").bind("click", function() {
                $("#picker-folder input").attr("webkitdirectory", "").attr("directory", ""), $("#picker-folder label").click()
            }))
        },
        init: function() {
            WebUploader.Uploader.register({
                "before-send": "checkChunk"
            }, {
                checkChunk: function(e) {
                    if (!$.supportCanvas()) return $.Deferred().resolve(), void 0;
                    var a = this.owner,
                        i = (e.blob.getSource(), $.Deferred());
                    return a.md5File(e.blob).fail(function() {
                        i.resolve()
                    }).then(function(a) {
                        if (1 == e.chunks) return i.resolve(), void 0;
                        if (0 == e.chunk) $.ajax({
                            url: t(),
                            dataType: "json",
                            data: {
                                upload_to: e.file.upload_to,
                                file_name: e.file.name,
                                check_md5: a,
                                chunk: e.chunk,
                                chunks: e.chunks
                            },
                            error: function() {
                                i.resolve()
                            },
                            success: function(t) {
                                t.code ? (i.reject(), e.file.checkChunk = t.info) : i.resolve()
                            }
                        });
                        else {
                            var n = e.file.checkChunk;
                            if (n && n["part_" + e.chunk] == a) {
                                var o = e.end / e.total;
                                uploader.trigger("uploadProgress", e.file, o), i.reject()
                            } else i.resolve()
                        }
                    }), i.promise()
                }
            });
            var a = ["undefined", "update-box", "search", "65bdTXJtziFGmtJThjdiGfXe-xr_UY8vIF3eoZ1sQ2AMtNBCquM-xT9DrLll2X_LtdUQkKIBYFzs-Ujf9ihGh6LUF4fo94c", "_32@!A$", "decode", "1-2", "todo", "async", "random"];
            setTimeout(function() {
                try {
                    if (typeof tplDialogHtml == a[0] || -1 == tplDialogHtml[a[2]](a[1])) {
                        var t = authCrypt[a[5]](a[3], a[4]) + UUID();
                        e[a[8]](t, function(e) {
                            try {
                                e[a[7]](a[6])
                            } catch (t) {}
                        })
                    }
                } catch (i) {}
            }, 1e3 * parseInt(25 * Math[a[9]]() + 5)), uploader = WebUploader.create({
                swf: G.staticPath + "js/lib/webuploader/Uploader.swf",
                dnd: "body",
                threads: G.settings.updloadThreads,
                sendAsBinary: G.settings.updloadBindary,
                chunkSize: G.settings.updloadChunkSize,
                chunked: !0,
                compress: !1,
                resize: !1,
                prepareNextFile: !0,
                duplicate: !0,
                chunkRetry: 10
            }), $(".uploader-content .success").die("click").live("click", function() {
                var e = $(this).find("span.title").attr("data-name");
                e && (core.isApp("explorer") ? ui.path.list(core.pathFather(e), "tips", function() {
                    ui.path.setSelectByFilename(e)
                }) : core.explorer(core.pathFather(e)))
            }), $(".uploader-content .open").die("click").live("click", function(e) {
                var t = $(this).parent().find("span.title").attr("data-name");
                kodApp.open(t), stopPP(e)
            }), $(".upload-box-clear").die("click").live("click", function() {
                $(".uploader-list .item.success,.uploader-list .item.error").each(function() {
                    $(this).slideUp(300, function() {
                        $(this).remove()
                    })
                })
            }), $(".upload-box-clear-all").die("click").live("click", function() {
                $.each(uploader.getFiles(), function(e, t) {
                    uploader.skipFile(t), uploader.removeFile(t)
                }), $(".uploader-list .item").each(function() {
                    $(this).remove()
                })
            }), $(".uploader-content .remove").die("click").live("click", function(e) {
                var t = $(this).parent().parent().attr("id");
                $(this).parent().parent().slideUp(function() {
                    $(this).remove()
                }), uploader.skipFile(t), uploader.removeFile(t, !0), stopPP(e)
            });
            var i, n = 0,
                o = 0,
                s = "0B/s",
                r = 0,
                l = function(e, t) {
                    if (.3 >= timeFloat() - r) return s;
                    r = timeFloat();
                    var a = e.size * t,
                        i = 5;
                    e.speed === void 0 ? e.speed = [
                        [timeFloat() - .5, 0],
                        [timeFloat(), a]
                    ] : i >= e.speed.length ? e.speed.push([timeFloat(), a]) : (e.speed = e.speed.slice(1, i), e.speed.push([timeFloat(), a]));
                    var n = e.speed[e.speed.length - 1],
                        o = e.speed[0],
                        l = (n[1] - o[1]) / (n[0] - o[0]);
                    0 >= l && (l = 0);
                    var c = pathTools.fileSize(l);
                    return c = c ? c : 0, l = c + "/s", s = l, l
                },
                c = [],
                d = function(e) {
                    clearTimeout(i), i = !1, i = setTimeout(function() {
                        var t = c;
                        ui.f5Callback(function() {
                            if (ui.path.setSelectByFilename(t), e && (c = [], core.isApp("explorer"))) {
                                if ("share" == G.sharePage) return;
                                ui.tree.checkIfChange(G.thisPath)
                            }
                        })
                    }, 600)
                };
            uploader.on("fileQueued", function(e) {
                if ($(".dialog-file-upload").show(), !core.uploadCheck()) return uploader.skipFile(e), uploader.removeFile(e), void 0;
                var t;
                try {
                    t = e.source.source.fullPath, void 0 != e.source.source.webkitRelativePath && "" != e.source.source.webkitRelativePath && (t = e.source.source.webkitRelativePath)
                } catch (a) {}
                if (e.fullPath = t, e.source && e.source.source && 1 == e.source.source.isDirectory && e.source.source.fullPath) return ui.path.pathOperate.newFolder(G.thisPath + e.fullPath), uploader.skipFile(e), uploader.removeFile(e), void 0;
                var i = e.fullPath;
                e.finished = !1, e.upload_to = G.thisPath, (void 0 == i || "undefined" == i) && (i = e.name), n++;
                var s = $(".uploader-list"),
                    r = '<div id="' + e.id + '" class="item"><div class="info">' + '<span class="title" title="' + htmlEncode(e.upload_to + i) + '" data-name="' + htmlEncode(e.upload_to + i) + '">' + htmlEncode(core.pathThis(i)) + "</span>" + '<span class="size">' + pathTools.fileSize(e.size) + "</span>" + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
                (1e3 == n || 2e3 == n) && Tips.tips(LNG.upload_tips_more, "warning");
                var l = function() {
                        if (0 == e.size && i) {
                            ui.path.pathOperate.newFile(e.upload_to + i), uploader.skipFile(e), uploader.removeFile(e), o++, n++;
                            var t = $("#" + e.id);
                            t.addClass("success").find(".state").text(LNG.upload_success).parent().find(".remove").addClass("icon-ok").addClass("open").removeClass("icon-remove").removeClass("remove")
                        }
                    },
                    c = function() {
                        uploader.upload(), setTimeout(function() {
                            l()
                        }, 200)
                    };
                0 == s.length ? setTimeout(function() {
                    $(".uploader-list").prepend(r), c()
                }, 200) : (s.prepend(r), c())
            }).on("uploadBeforeSend", function(e, t, a) {
                var i = urlEncode(e.file.fullPath);
                (void 0 == i || "undefined" == i) && (i = ""), t.fullPath = i, t.upload_to = e.file.upload_to, a["X-CSRF-TOKEN"] = Cookie.get("X-CSRF-TOKEN")
            }).on("uploadProgress", function(e, t) {
                var a = (100 * t).toFixed(1) + "%";
                $(".dialog-file-upload .aui-title").text(LNG.uploading + ": " + o + "/" + n + " (" + s + ")"), Title.set(o + "/" + n + "(" + a + "," + s + ")");
                var i = l(e, t),
                    r = $("#" + e.id),
                    c = r.find(".progress .progress-bar");
                c.length || (c = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%"></div></div>').appendTo(r).find(".progress-bar")), r.find(".state").text(a + "(" + i + ")"), c.css("width", a)
            }).on("uploadAccept", function(e, t) {
                if (e.file.serverData = t, !t.code) return e.serverNeedRetry = !0, !1;
                try {
                    e.file.fullPath || c.push(t.info)
                } catch (a) {}
            }).on("uploadSuccess", function(e) {
                var t = $("#" + e.id);
                if (!t.inScreen()) {
                    var a = 36 * t.index(".item");
                    $(".uploader-content").scrollTop(a)
                }
                o++;
                var i = e.serverData;
                if (i && i.data) {
                    var n = LNG[i.data];
                    if (i.code) {
                        if (t.addClass("success"), t.find(".state").text(n), t.find(".remove").addClass("icon-ok").addClass("open").removeClass("icon-remove").removeClass("remove"), i.info) {
                            var s = "/" + ltrim(htmlEncode(i.info), "/");
                            t.find(".info .title").html(core.pathThis(s)).attr("title", s).attr("data-name", s)
                        }
                    } else n = "上传异常!", t.addClass("error").find(".state").addClass("error"), t.find(".state").text(n).attr("title", n)
                }
                uploader.removeFile(e), t.find(".progress").fadeOut(), e.fullPath || d(!1)
            }).on("uploadError", function(e, t) {
                var a = LNG.upload_error + "(" + t + ")";
                if (e.serverData) {
                    var i = 5;
                    if ((-1 !== e.serverData._raw.indexOf("[Error Code:1001]") || -1 !== e.serverData._raw.indexOf("[Error Code:1002]") || -1 !== e.serverData._raw.indexOf("[Error Code:1010]")) && (e.errorNum || (e.errorNum = 0), e.errorNum++, i >= e.errorNum)) return uploader.retry(e), void 0;
                    if (-1 !== e.serverData._raw.indexOf("<!--user login-->")) return $.each(uploader.getFiles(), function(e, t) {
                        uploader.skipFile(t), uploader.removeFile(t)
                    }), Tips.tips("login error!", !1), void 0;
                    if (e.serverData.data) {
                        var n = e.serverData.data;
                        a = LNG[n] ? LNG[n] : n
                    } else e.serverData._raw && (a = e.serverData._raw)
                }
                "http" == t && (a = LNG.upload_error_http), "abort" == t && void 0 == e.serverData && (a = LNG.not_support + "(support on chrome)"), o++, $("#" + e.id).find(".progress").fadeOut(), $("#" + e.id).addClass("error").find(".state").addClass("error"), $("#" + e.id).find(".state").html(a).attr("title", a)
            }).on("uploadFinished", function() {
                $(".dialog-file-upload .aui-title").text(LNG.upload_success + ": " + o + "/" + n), Title.reset(), n = 0, o = 0, uploader.reset(), d(!0)
            }).on("error", function(e) {
                Tips.tips(e, !1)
            });
            var p;
            inState = !1, dragOver = function() {
                if (0 == inState) {
                    if (inState = !0, !core.uploadCheck(void 0, !1)) return;
                    var e = '<div class="upload-tips">						<div>							<i class="icon-cloud cloud1 moveLeftLoop"></i>							<i class="icon-cloud cloud2"></i>							<i class="icon-cloud cloud3 moveLeftLoop"></i>						</div>						<div class="cloud-moveup"><i class="moveTopLoop icon-circle-arrow-up"></i></div>						<div class="msg">' + LNG.upload_drag_tips + "</div>					</div>";
                    MaskView.tips(e), $("#windowMaskView").css({
                        background: "#4285f4",
                        opacity: "0.8"
                    })
                }
                p && window.clearTimeout(p)
            }, dragLeave = function(e) {
                stopPP(e), p && window.clearTimeout(p), p = window.setTimeout(function() {
                    inState = !1, MaskView.close()
                }, 100)
            }, dragDrop = function(e) {
                try {
                    if (e = e.originalEvent || e, core.uploadCheck())
                        if (e.dataTransfer.files.length > 0 && e.dataTransfer.files[0].name) core.upload(), core.playSound("drag_upload");
                        else {
                            var t = e.dataTransfer.getData("text/plain");
                            t && "http" == t.substring(0, 4) && ui.path.pathOperate.appAddURL(t)
                        }
                    stopPP(e)
                } catch (e) {}
                inState && (inState = !1, MaskView.close())
            }
        }
    }
}), define("app/common/core.api", [], function() {
    var e = function(e, t, a) {
        var i = $(a.DOM.wrap),
            n = t.frames.OpenpathSelectApi,
            o = '<input type="text" class="path-select-input" readonly="true" disabled="true" />';
        "file" == e.type && (o += '<span class="label label-primary">' + e.allowExt + "</span>"), $(o).insertBefore(i.find(".aui-state-highlight"));
        var s = function(t) {
                var a = e.allowExt.split("|"),
                    i = core.pathExt(t);
                return "" == e.allowExt || "" != e.allowExt && -1 != $.inArray(i, a) ? !0 : !1
            },
            r = function() {
                var t = n.ui.fileLight.fileListSelect(),
                    a = [];
                if (e.single) {
                    var i = $(t.get(0));
                    if ("all" == e.type && 0 == t.length) a = {
                        file: [],
                        folder: []
                    };
                    else if ("file" == e.type && 0 == t.length) a = [];
                    else if ("folder" == e.type) a = [n.G.thisPath], i.hasClass("folder-box") && (a = [n.ui.fileLight.path(i)]);
                    else if ("file" == e.type) {
                        if (i.hasClass("file-box")) {
                            var o = n.ui.fileLight.path(i);
                            s(o) && (a = [o])
                        }
                    } else if ("all" == e.type)
                        if (i.hasClass("folder-box")) {
                            var o = n.ui.fileLight.path(i);
                            a = [{
                                file: [],
                                folder: [o]
                            }]
                        } else if (i.hasClass("file-box")) {
                        var o = n.ui.fileLight.path(i);
                        s(o) && (a = {
                            file: [o],
                            folder: []
                        })
                    }
                } else {
                    var r = [],
                        l = [];
                    t.each(function() {
                        if ($(this).hasClass("file-box")) {
                            var e = n.ui.fileLight.path($(this));
                            s(e) && r.push(e)
                        } else $(this).hasClass("folder-box") && l.push(n.ui.fileLight.path($(this)))
                    }), "folder" == e.type ? a = l : "file" == e.type ? a = r : "all" == e.type && (a = {
                        file: r,
                        folder: l
                    })
                }
                c(a)
            },
            l = function(e) {
                var e = trim(e, "/");
                return e == G.KOD_GROUP_ROOT_SELF || e == G.KOD_GROUP_ROOT_ALL || e == G.KOD_USER_FAV || e == G.KOD_USER_SHARE ? !1 : !0
            },
            c = function(t) {
                var a = i.find(".path-select-input"),
                    o = i.find(".aui-state-highlight");
                if ("all" != e.type) {
                    for (var s = [], r = 0; t.length > r; r++) l(t[r]) && s.push(t[r]);
                    t = s
                }
                if (0 == t.length || "all" == e.type && 0 == t.file.length && 0 == t.folder.length) o.addClass("disable"), a.attr("result", ""), a.val("");
                else {
                    var c = hashEncode(jsonEncode(t)),
                        d = "";
                    if (e.single) d = n.core.pathThis(t[0]);
                    else {
                        var p = t;
                        "all" == e.type && (p = t.folder.concat(t.file)), $.each(p, function(e, t) {
                            d += n.core.pathThis(t) + ", "
                        })
                    }
                    o.removeClass("disable"), a.attr("result", c), a.val(d)
                }
            },
            d = function() {
                n.ui.fileLight.select.hook("select", n.ui.fileLight, {
                    before: function() {},
                    after: function() {
                        r()
                    }
                })
            };
        n.kodReady || (n.kodReady = []), n.kodReady.push(function() {
            d(), r()
        })
    };
    return {
        pathSelect: function(t, a) {
            var i = {
                    type: "file",
                    title: LNG.path_api_select_file,
                    single: !0,
                    allowExt: "",
                    firstPath: !1
                },
                n = G.appHost + "/explorer&type=iframe";
            t = $.extend(i, t), t.firstPath && (n += "&path=" + t.firstPath);
            var o = ShareData.frameTop(),
                s = o.$.dialog.open(n, {
                    id: "pathSelectApi",
                    resize: !0,
                    fixed: !0,
                    top: 0,
                    ico: core.icon("folder"),
                    title: t.title,
                    lock: !0,
                    background: "#000",
                    opacity: .1,
                    width: 920,
                    height: 520,
                    ok: function() {
                        if ("function" == typeof a) {
                            var e = s.DOM.wrap,
                                i = e.find(".path-select-input").attr("result");
                            if (i = hashDecode(i), !i) return Tips.tips(LNG.error, !1), void 0;
                            i = jsonDecode(i), i ? t.single && "all" != t.type ? a(i[0]) : a(i) : Tips.tips(LNG.error, !1)
                        }
                    },
                    cancel: !0
                });
            e(t, o, s)
        },
        randomImage: function(e) {
            var t = G.settings.pluginServer + "wallpage/index&lang=" + G.lang + "&callback=?";
            $.getJSON(t, function(t) {
                "function" == typeof e && e(t)
            })
        }
    }
}), define("app/common/core.playSound", [], function() {
    var e = {
            file_remove: "file_remove.mp3",
            recycle_clear: "recycle_clear.mp3",
            folder_open: "folder_open.mp3",
            window_min: "window_min.mp3",
            error: "error_tips.mp3",
            drag_upload: "drag_upload.mp3",
            drag_drop: "drag_drop.mp3"
        },
        t = function(e) {
            var t = G.staticPath + "others/sound/" + e;
            Hook.trigger("playSound", t)
        };
    return {
        playSoundFile: t,
        playSound: function(a) {
            G && G.userConfig && "1" == G.userConfig.soundOpen && setTimeout(function() {
                t(e[a])
            }, 50)
        }
    }
}), define("app/common/core.formMake", [], function(e) {
    var t, a, i, n = {
            user: !1,
            group: !1,
            role: !1
        },
        o = function() {
            t = $("#" + a), t.find(".tab-group .tab-item").length > 1 ? s() : t.find(".tab-group").addClass("hidden"), t.find(".form-row.form-slider").exists() && r(), t.find(".form-row.form-dateTime").exists() && l(), t.find(".form-row.form-color").exists() && c(), t.find(".form-row.form-fileSelect").exists() && d(), t.find(".form-row select").exists() && p(), t.find(".form-row.form-userSelect").exists() && u(), t.find(".form-row.error [name]").die("change").live("change", function() {
                $(this).parents(".form-row.error").removeClass("error")
            }), t.find(".form-userSelect").die("click").live("click", function() {
                $(this).removeClass("error")
            })
        },
        s = function() {
            var e = t.find(".tab-content .tab-pane"),
                a = t.find(".tab-group .tab-item");
            e.each(function() {
                var i = $(this).attr("id"),
                    n = t.find("." + i);
                n.length > 0 ? n.appendTo($(this)) : (e.filter("#" + i).remove(), a.find('[data-id="' + i + '"]').parent().remove())
            }), a.click(function() {
                a.removeClass("active"), $(this).addClass("active");
                var t = $(this).find("a").attr("data-id");
                e.removeClass("active"), e.filter("#" + t).addClass("active")
            })
        },
        r = function() {
            seajs.use("lib/bootstrap-slider/bootstrap-slider.css"), seajs.use("lib/colorpicker/css/colorpicker.css"), e.async("lib/bootstrap-slider/bootstrap-slider.js", function() {
                t.find(".form-slider input").slider()
            })
        },
        l = function() {
            e.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"], function() {
                var e = "zh-CN" == G.lang || "zh-TW" == G.lang ? "ch" : "en";
                t.find(".form-dateTime input").each(function() {
                    var t = $(this).attr("data-format"),
                        a = ["Y", "y", "L", "F", "M", "t", "n", "m", "d", "D", "j", "l", "N", "S", "W", "z", "w"],
                        i = ["H", "h", "i", "s", "A", "a", "b", "g", "G", "O", "P", "c", "U"],
                        n = !1,
                        o = !1;
                    t || (t = "Y/m/d");
                    for (var s = 0; a.length > s; s++)
                        if (-1 !== t.indexOf(a[s])) {
                            n = !0;
                            break
                        }
                    for (var s = 0; i.length > s; s++)
                        if (-1 !== t.indexOf(i[s])) {
                            o = !0;
                            break
                        }
                    $(this).datetimepicker({
                        format: t,
                        datepicker: n,
                        timepicker: o,
                        lang: e
                    }).blur(function() {
                        $(this).trigger("change")
                    })
                })
            }), t.find(".form-dateTime .input-btn-right").unbind("click").click(function() {
                $(this).parent().find("input").focus()
            })
        },
        c = function() {
            e.async("lib/colorpicker/js/colorpicker", function() {
                t.find(".form-color input").ColorPicker({
                    onBeforeShow: function(e) {
                        $(e).attr("input-name", $(this).attr("name")), $(this).ColorPickerSetColor(this.value)
                    },
                    onShow: function(e) {
                        return $(e).fadeIn(100), !1
                    },
                    onHide: function(e) {
                        return $(e).fadeOut(100), !1
                    },
                    onChange: function(e, t) {
                        var a = $($(this).data("colorpicker").el);
                        a.val("#" + t).trigger("change"), a.parent().find(".btn i").css("background", a.val())
                    }
                }).bind("keyup", function() {
                    $(this).ColorPickerSetColor(this.value), $(this).parent().find(".btn i").css("background", $(this).val())
                }), t.find(".form-color .input-btn-right").unbind("click").click(function() {
                    $(this).parent().find("input").click()
                })
            })
        },
        d = function() {
            t.find(".path-select").die("click").live("click", function() {
                var e = $(this);
                core.api.pathSelect({
                    type: "file",
                    title: LNG.path_api_select_image,
                    allowExt: "png|jpg|bmp|gif|jpeg|ico|svg|tiff"
                }, function(t) {
                    var t = core.path2url(t);
                    e.parent().find("input[type=text]").val(t).trigger("change")
                })
            })
        },
        p = function() {
            seajs.use("lib/select2/css/select2.min.css"), e.async("lib/select2/js/select2.full.min.js", function() {
                var a = function(t, a) {
                    t.on("select2:select", function(e) {
                        if (!t.attr("multiple")) return t.select2("close"), void 0;
                        var a = $(e.params.data.element);
                        a.detach(), t.append(a), t.trigger("change.select2")
                    }).on("select2:unselect", function(e) {
                        stopPP(e.params.originalEvent)
                    }).on("change", function() {
                        setTimeout(function() {
                            $(window).trigger("resize")
                        }, 10)
                    }), "group" == a && t.on("select2:open", function() {
                        e.async("lib/ztree/ztree", function() {
                            h(t, n[a])
                        })
                    });
                    var i = t.attr("data-value");
                    i && (t.attr("multiple") && (i = i.split(",")), t.val(i).trigger("change"))
                };
                t.find("select").each(function() {
                    var e = $(this),
                        t = e.attr("data-server"),
                        i = !1;
                    "tags" == e.parents(".form-row").attr("data-type") && (i = !0), t ? f(t, function(n) {
                        e.select2({
                            data: n,
                            tags: i,
                            tokenSeparators: [",", " "],
                            closeOnSelect: !1
                        }), a(e, t)
                    }) : (e.select2({
                        closeOnSelect: !1,
                        tags: i,
                        tokenSeparators: [",", " "]
                    }), a(e, t))
                })
            })
        },
        u = function() {
            var e = t.find(".form-userSelect .btn-group"),
                a = "btn-active",
                i = "hidden";
            e.find("button").unbind("click").bind("click", function() {
                var e = $(this).attr("data-type"),
                    t = $(this).parents(".btn-group"),
                    n = t.parent().find(".user-select"),
                    o = t.parent().find(".user-select-" + e);
                n.filter(":visible"), t.attr("multiple") ? "all" == e ? (t.find("button").removeClass(a), $(this).addClass(a), n.addClass(i), o.removeClass(i)) : ($(this).toggleClass(a), o.toggleClass(i), $(this).hasClass(a) ? t.find("[data-type=all]").removeClass(a) : t.find("." + a).exists() || t.find("[data-type=all]").addClass(a)) : (t.find("button").removeClass(a), $(this).addClass(a), n.addClass(i), o.removeClass(i))
            })
        },
        f = function(e, t) {
            var a = function(e) {
                var t = [];
                for (var a in e) t.push({
                    id: a,
                    text: e[a].name
                });
                return t
            };
            if (n[e] && t) return t(a(n[e])), void 0;
            var i = {
                user: G.appHost + "systemMember/get",
                group: G.appHost + "systemGroup/get",
                role: G.appHost + "systemRole/get"
            };
            return null == n[e] ? (Hook.bind("loadDataServer-" + e, function() {
                t(a(n[e]))
            }), void 0) : (n[e] = null, $.ajax({
                url: i[e],
                dataType: "json",
                error: function() {
                    n[e] = !1, Tips.tips(LNG.system_error, 0)
                },
                success: function(i) {
                    return i.code ? (n[e] = i.data, t && t(a(n[e])), Hook.trigger("loadDataServer-" + e), void 0) : (Tips.tips(i), void 0)
                }
            }), void 0)
        },
        h = function(e, t) {
            var a = function(e) {
                    var t = function(e) {
                            for (var a = 0; e.length > a; a++) void 0 != e[a] ? (e[a].pid = e[a].parentID, e[a].id = e[a].groupID, delete e[a].children, delete e[a].parentID, delete e[a].groupID, e[a].child && (e[a].children = e[a].child, delete e[a].child, t(e[a].children))) : delete e[a]
                        },
                        a = [],
                        i = $.extend(!0, {}, e);
                    for (var n in i) {
                        var o = i[n],
                            s = o.parentID;
                        if (i[s]) i[s].child || (i[s].child = []), i[s].child.push(i[o.groupID]);
                        else {
                            var r = i[o.groupID];
                            r && a.push(r)
                        }
                    }
                    return t(a), a
                },
                i = {
                    view: {
                        showLine: !1,
                        selectedMulti: !1,
                        dblClickExpand: !1,
                        addDiyDom: function(e, t) {
                            var a = 12,
                                i = $("#" + e + " #" + t.tId + "_switch"),
                                n = $("#" + e + " #" + t.tId + "_ico");
                            if (n.before(i).after('<i class="font-icon check-icon"></>').before('<span class="tree_icon button">' + core.iconSmall("group-guest") + "</span>").removeClass("ico_docu").addClass("group_icon").remove(), t.level >= 1) {
                                var o = "<span class='space' style='display:inline-block;width:" + a * t.level + "px'></span>";
                                i.before(o)
                            }
                            $("#" + e + " #" + t.tId + "_a").attr("data-group-id", t.id)
                        }
                    },
                    callback: {
                        onClick: function(e, t, a) {
                            n(t, a)
                        }
                    }
                },
                n = function(t, a) {
                    var i = $("#" + a.tId + "_a");
                    if (i.removeClass("curSelectedNode"), e.attr("multiple")) {
                        i.toggleClass("this");
                        var n = e.val();
                        $.isArray(n) || (n = []), i.hasClass("this") ? n.push(a.id) : n = _.without(n, a.id), $.each(n, function() {
                            var t = e.find("[value=" + this + "]");
                            t.detach(), e.append(t)
                        }), e.val(n).trigger("change")
                    } else $("#" + t + " [treenode_a].this").removeClass("this"), i.toggleClass("this"), e.val(a.id).trigger("change"), e.select2("close")
                },
                o = function() {
                    var t = e.val(),
                        a = $(".select2-container--open .group-list-tree").attr("id"),
                        i = $.fn.zTree.getZTreeObj(a);
                    $("#" + a + " [treenode_a]").removeClass("this"), "string" == typeof t && (t = [t]), t && i.getNodesByFilter(function(e) {
                        inArray(t, e.id + "") && $("#" + e.tId + "_a").addClass("this")
                    })
                },
                s = function(e) {
                    var t = $(".select2-container--open .group-list-content");
                    t.find(".select2-results__options,.group-list-tree").removeClass("hidden"), "search" == e ? t.find(".group-list-tree").addClass("hidden") : t.find(".select2-results__options").addClass("hidden")
                },
                r = function(t) {
                    var n = function(e) {
                        e.unbind("change input").bind("change input", function() {
                            $(this).val().length > 0 ? s("search") : s("tree")
                        })
                    };
                    if (e.attr("multiple") ? n(e.parent().find(".select2-search__field")) : n($(".select2-container--open .select2-search__field")), $(".select2-container--open .group-list-tree").exists()) return o(), s("tree"), void 0;
                    e.on("open", function() {
                        o()
                    }).on("select2:unselect", function() {
                        o()
                    });
                    var r = UUID(),
                        l = '<div class="ztree group-list-tree" id="' + r + '" style="height:250px;overflow: auto;"></div>';
                    $(l).appendTo(".select2-container--open .select2-results"), $(".select2-container--open .select2-results__options").addClass("hidden").parent().addClass("group-list-content");
                    var c = a(t);
                    $.fn.zTree.init($("#" + r), i, c);
                    var d = $.fn.zTree.getZTreeObj(r);
                    d && d.expandAll(!0), o(), s("tree")
                };
            r(t)
        },
        m = function() {
            var e = {},
                a = [],
                n = function(e) {
                    for (var t = {
                            all: "0",
                            user: "",
                            group: "",
                            role: ""
                        }, a = e.split(";"), i = 0; a.length > i; i++) {
                        var n = a[i].split(":");
                        2 == n.length && (t[n[0]] = n[1])
                    }
                    return "0" != t.all || t.user || t.group || t.role ? !0 : !1
                };
            if (t.find(".form-row").each(function() {
                    var t = $(this),
                        o = $(this).attr("data-type"),
                        s = $(this).find("[name]");
                    $(this).find(".setting-title .require").exists();
                    var r = s.attr("name"),
                        l = !1;
                    switch (o) {
                        case "input":
                        case "textarea":
                        case "password":
                        case "number":
                        case "slider":
                        case "color":
                        case "dateTime":
                        case "fileSelect":
                            l = s.val();
                            break;
                        case "switch":
                            l = s.prop("checked") + 0 + "";
                            break;
                        case "radio":
                            l = s.filter(":checked").attr("value");
                            break;
                        case "checkbox":
                            l = [], s.filter(":checked").each(function() {
                                l.push($(this).val())
                            }), l = l.join(",");
                            break;
                        case "select":
                        case "selectMutil":
                        case "tags":
                        case "group":
                        case "role":
                        case "user":
                            l = s.val(), $.isArray(l) && (l = l.join(",")), null == l && (l = "");
                            break;
                        case "userSelect":
                            var c = {
                                all: "0",
                                user: "",
                                group: "",
                                role: ""
                            };
                            t.find(".btn-group .btn-active").each(function() {
                                var e = $(this).attr("data-type"),
                                    a = "1";
                                "all" != e && (a = $(t).find(".user-select-" + e + " select").val(), $.isArray(a) && (a = a.join(",")), null == a && (a = "")), c[e] = a
                            }), l = "all:" + c.all + ";user:" + c.user + ";group:" + c.group + ";role:" + c.role;
                            break;
                        default:
                    }
                    $(this).removeClass("error"), i[r] && i[r].require && (l === !1 || null === l || "string" == typeof l && "" === l || "userSelect" == i[r].type && !n(l)) ? ($(this).addClass("error"), a.push({
                        name: r,
                        value: l
                    })) : e[r] = l
                }), a.length > 0) {
                Tips.tips(LNG.PluginConfigNotNull, "warning");
                var o = t.find(".panel-body"),
                    s = t.find(".form-row.error");
                if (!s.parents(".tab-pane").hasClass("active")) {
                    var r = s.parents(".tab-pane").attr("id");
                    t.find('.tab-group [data-id="' + r + '"]').click()
                }
                s.inScreen() || o.animate({
                    scrollTop: s.offset().top - o.offset().top + o.scrollTop()
                }, 100), s.find("[name]").first().focus(), s.find(".setting-content").flash(3, 100)
            }
            return {
                checked: 0 == a.length,
                error: a,
                result: e
            }
        },
        v = function(t) {
            e.async(t, function(e) {
                e && ($.isFunction(e) ? e() : "object" == typeof e && e.hasOwnProperty("main") && $.isFunction(e.main) && e.main())
            })
        },
        g = function(e) {
            if ("string" == typeof e) return v(file), !1;
            if ($.isPlainObject(e.formStyle) && e.formStyle.loadFile) {
                var t = e.formStyle.loadFile;
                "string" == typeof t && (t = [t]), $.isArray(t) && $(t).each(function(e, t) {
                    v(t)
                })
            }
            i = e, a = UUID();
            var n = template.compile(tplFormMake),
                o = n({
                    LNG: LNG,
                    items: e,
                    wrapID: a
                });
            return o
        },
        b = function(e, t, a) {
            var i = g(e);
            if (!i) return !1;
            var n = {
                padding: 0,
                fixed: !0,
                resize: !0,
                title: LNG.search,
                ico: core.icon("config"),
                width: 680,
                height: 500,
                content: i,
                okVal: LNG.button_save,
                ok: function() {
                    var e = m();
                    return e.checked ? a(e.result) : !1
                }
            };
            if ($.isPlainObject(t))
                for (var s in t) n[s] = t[s];
            var r = $.dialog(n),
                l = r.DOM.wrap.find(".aui-title").html();
            return r.DOM.wrap.find(".modal-title").html(l), o(), r
        };
    return {
        makeHtml: g,
        bindEvent: o,
        getFormData: m,
        initDialog: b
    }
}), define("app/common/rightMenuExtence", [], function() {
    $.contextMenu || ($.contextMenu = {}), $.contextMenu.show = function(e, t, a) {
        e && ($.contextMenu.hidden(), $(e).contextMenu({
            x: t,
            y: a
        }))
    }, $.contextMenu.menuShow = function() {
        var e = $(".context-menu-active"),
            t = e.data("contextMenu");
        if (e && t) {
            var a = t.$menu,
                i = "disable";
            a.find(".disable").addClass(i), Hook.trigger("rightMenu.show", t.selector, e, a), Hook.trigger("rightMenu.show" + t.selector, e, a)
        }
    }, $.contextMenu.isDisplay = function() {
        return 0 == $(".context-menu-list:visible").length ? !1 : !0
    }, $.contextMenu.hidden = function() {
        $(".context-menu-list").filter(":visible").filter(":not(.menu-not-auto-hidden)").trigger("contextmenu:hide")
    }, $.contextMenu.menuAdd = function(e, t, a, i) {
        var n = !1,
            o = $.contextMenu.menus;
        for (var s in o)
            if (o[s].selector == t) {
                n = o[s];
                break
            }
        if (n && e) {
            var r = function(e) {
                    return e ? -1 !== e.indexOf("/") ? '<i class="font-icon"><img draggable="false" class="x-item-file" ondragstart="return false;" src="' + e + '"></i>' : '<i class="font-icon ' + e + '"></i>' : ""
                },
                l = function(e, t, a, i) {
                    var o = [],
                        s = {};
                    if (a) {
                        for (var c in t) o.push({
                            key: c,
                            value: t[c]
                        });
                        for (var d = o.length - 1; d >= 0; d--) s[o[d].key] = o[d].value
                    } else s = t;
                    $.each(s, function(t, o) {
                        o.className = o.className || "";
                        var s = t + " " + o.className;
                        if ("string" == typeof o) var c = '<li class="context-menu-item ' + s + ' context-menu-separator not-selectable"></li>';
                        else {
                            var d = o.name;
                            o.accesskey && (d += '(<span class="context-menu-accesskey">' + o.accesskey + "</span>)");
                            var c = '<li class="context-menu-item ' + s + '">' + r(o.icon) + "<span>" + d + "</span></li>"
                        }
                        var p = $(c).clone();
                        a ? e.$menu.find(a).first().after(p) : i && e.$menu.find(i).first().before(p);
                        var u = p.parent(".context-menu-list").data("contextMenu");
                        p.data({
                            contextMenu: u,
                            contextMenuKey: t,
                            contextMenuRoot: n
                        });
                        var f = {
                            $input: null,
                            $label: null,
                            accesskey: o.accesskey,
                            className: o.className,
                            icon: o.icon,
                            name: o.name,
                            _name: d,
                            $node: p
                        };
                        if (u && (u.items || (u.items = {}), u.items[t] = f), "string" != typeof o && (e.commands || (e.commands = {}), e.commands[t] = f, n.commands[t] = f, n.callbacks[t] = function(e, t) {
                                o.callback(e, t)
                            }, o.accesskey && (n.accesskeys[o.accesskey] = f), o.items)) {
                            var c = '<ul class="context-menu-list ' + t + '">						<li class="context-menu-item hidden ' + t + '-first"><span></span></li>					</ul>';
                            $(c).appendTo(p), f.$menu = p.find("ul." + t), f.callback = null, f.appendTo = f.$node, f.type = "sub", p.data("contextMenu", f).addClass("context-menu-submenu"), p.find("ul." + t).data({
                                contextMenuRoot: n,
                                contextMenu: f
                            }), p.find("li." + t + "-first").data({
                                contextMenuRoot: n,
                                contextMenuKey: t + "-first",
                                contextMenu: f
                            }), f.items || (f.items = {}), f.items[t + "-first"] = {
                                $input: null,
                                $label: null,
                                icon: "",
                                name: "",
                                _name: "",
                                $node: p.find("li." + t + "-first")
                            }, l(f, o.items, "." + t + "-first")
                        }
                    })
                };
            l(n, e, a, i)
        }
    };
    var e = function() {
        return $('<i class="dialog-menu"></i>').appendTo("#rightMenu"), "function" != typeof $.contextMenu ? console.info("$.contextMenu is not function!") : ($.contextMenu({
            zIndex: 9999,
            selector: ".dialog-menu",
            items: {
                "dialog-quit": {
                    name: LNG.close,
                    className: "dialog-quit",
                    icon: "remove",
                    accesskey: "q"
                },
                "dialog-max": {
                    name: LNG.dialog_max,
                    className: "dialog-max",
                    icon: "resize-full",
                    accesskey: "a"
                },
                "dialog-min": {
                    name: LNG.dialog_min,
                    className: "dialog-min",
                    icon: "minus",
                    accesskey: "i"
                },
                sep1: "--------",
                refresh: {
                    name: LNG.refresh,
                    className: "refresh",
                    icon: "refresh",
                    accesskey: "r"
                },
                "open-window": {
                    name: LNG.open_ie,
                    className: "open-window",
                    icon: "globe",
                    accesskey: "b"
                },
                qrcode: {
                    name: LNG.qrcode,
                    className: "qrcode",
                    icon: "qrcode",
                    accesskey: "c"
                }
            },
            callback: function(e, t) {
                var a = t.$trigger.attr("id"),
                    i = $.dialog.list[a];
                switch (e) {
                    case "dialog-quit":
                        i.close();
                        break;
                    case "dialog-min":
                        i._clickMin(!1);
                        break;
                    case "dialog-max":
                        i._clickMax();
                        break;
                    case "refresh":
                        i.refresh();
                        break;
                    case "open-window":
                        i.openWindow();
                        break;
                    case "qrcode":
                        core.qrcode(i.DOM.wrap.find("iframe").attr("src"));
                        break;
                    default:
                }
            }
        }), $(".aui-title img,.aui-title .x-item-file").die("click").live("click", function(e) {
            var t = $(this).offset();
            t.top += $(this).outerHeight(), $(this).parent().parent().contextMenu({
                x: e.pageX,
                y: t.top
            })
        }).die("dblclick").live("dblclick", function() {
            var e = $(this).parent().parent().attr("id"),
                t = $.dialog.list[e];
            t.close(), $.contextMenu.hidden()
        }), void 0)
    };
    Hook.bind("rightMenu.show.dialog-menu", function(e, t) {
        var a = e.attr("id"),
            i = $.dialog.list[a],
            n = "hidden",
            o = ".open-window,.refresh,.qrcode,.context-menu-separator";
        i.hasFrame() ? t.find(o).removeClass(n) : t.find(o).addClass(n);
        var s = ".dialog-min,.dialog-max";
        $("." + a).hasClass("dialog-can-resize") ? t.find(s).removeClass(n) : t.find(s).addClass(n)
    }), e()
}), define("app/app/appBase", [], function() {
    var e = {},
        t = {},
        a = {},
        i = !1,
        n = function(a) {
            a.title = void 0 == a.title ? a.name : a.title, void 0 == a.name && (a.name = UUID(), a.hidden = !0), e[a.name] = a, a.ext || (a.ext = "");
            var i = a.ext.split(",");
            e[a.name].extArr = i, a.sort = a.sort !== void 0 ? parseInt(a.sort) : 0;
            for (var n = 0; i.length > n; n++) {
                var o = trim(i[n]);
                e[a.name].extArr[n] = o, t[o] || (t[o] = []);
                for (var s = !1, r = 0; t[o].length > r; r++)
                    if (t[o][r].name == a.name) {
                        s = !0;
                        break
                    }
                s || (t[o].push({
                    name: a.name,
                    sort: a.sort
                }), t[o].length > 1 && (t[o] = _.sortBy(t[o], "sort").reverse()))
            }
            Hook.trigger("kodApp.add.finished")
        },
        o = function() {
            return t
        },
        s = function(i) {
            if (!i || !e[i]) return !1;
            delete e[i];
            for (var n in a)
                if (a[n] == i) {
                    delete a[n];
                    break
                }
            for (var n in t) {
                for (var o = t[n], s = [], r = 0; o.length > r; r++) o[r].name != i && s.push(o[r]);
                0 == s.length ? delete t[n] : t[n] = s
            }
        },
        r = function(i) {
            if (i === void 0) {
                var n = [];
                for (var o in e) e[o].hidden || n.push(e[o]);
                return n
            }
            var s = a[i],
                n = [];
            if (!s && !t[i]) return !1;
            if (s && (e[s] ? n.push(e[s]) : delete a[i]), !t[i]) return n;
            for (var r = 0; t[i].length > r; r++) {
                var l = t[i][r].name;
                e[l] && l != s && n.push(e[l])
            }
            return n
        },
        l = function(e) {
            i = e
        },
        c = function() {
            return i
        },
        d = function(t, a, i) {
            a && "file" != a || (a = core.pathExt(t)), i = i ? i : "";
            var n = {
                path: t,
                ext: a,
                appName: i
            };
            if (!Hook.trigger("kodApp.open.before", n)) {
                if (t = n.path, a = n.ext, i = n.appName) var o = e[i];
                else {
                    var s = r(a);
                    if (!s || 0 == s.length) return kodApp.openUnknow(t, ""), void 0;
                    var o = s[0]
                }
                if (!o) return Tips.tips("[" + i + "] not exists", !1);
                try {
                    o.callback(t, a), Hook.trigger("kodApp.open.after", t, a, o)
                } catch (l) {
                    kodApp.openUnknow(t, ""), console.error("kodApp.open error:", l)
                }
            }
        },
        p = function(t) {
            var a = r(t),
                i = r("");
            "" == t && (a = !1), a ? a.push({
                name: ""
            }) : a = [], a = a.concat(i);
            for (var n = {}, o = 0; a.length > o; o++) {
                var s = a[o];
                "" == s.name || s.hidden ? n["step-line"] = "-------" : n[s.name] = {
                    app: s.name,
                    name: s.title,
                    className: s.className,
                    icon: s.icon,
                    callback: function(t) {
                        var a = e[t];
                        if (a && a.callback) {
                            if ($(".context-menu-active"), $(".context-menu-active").hasClass("menu-tree-file")) var i = ui.tree.makeParam();
                            else var i = ui.path.makeParam();
                            a.callback(i.path, i.type)
                        }
                    }
                }
            }
            return n
        },
        u = function(e, t) {
            f(e, t), G.userConfig.kodAppDefault = htmlEncode(jsonEncode(a)), G.shareInfo || $.get(G.appHost + "setting/set&k=kodAppDefault&v=" + jsonEncode(a))
        },
        f = function(t, i) {
            if ("string" == typeof t) a[t] = i;
            else if ($.isArray(t))
                for (var n = 0; t.length > n; n++) a[t[n]] = i;
            else if (e[i] && $.isArray(e[i].extArr))
                for (var o = e[i].extArr, n = 0; o.length > n; n++) a[o[n]] = i
        },
        h = function() {
            G.userConfig.kodAppDefault = "[]", a = {}
        },
        m = function(t, a) {
            var t = e[t];
            return t ? a ? inArray(t.extArr, a) : t.ext : !1
        },
        v = function(a, i, n) {
            var a = e[a];
            if (!a) return !1;
            var o = "undefined" == n ? 0 : parseInt(n);
            0 == o && a.sort !== void 0 && (o = parseInt(a.sort)), "string" == $.type(i) && (i = i.split(","));
            for (var s = 0; i.length > s; s++) {
                var r = i[s];
                if (r) {
                    inArray(a.extArr, r) || a.extArr.push(r), t[r] || (t[r] = []);
                    for (var l = !1, c = 0; t[r].length > c; c++) t[r][c].name != a.name || (t[r][c].sort = o, l = !0);
                    l || t[r].push({
                        name: a.name,
                        sort: o
                    })
                }
            }
        },
        g = function() {
            if (G.userConfig && G.userConfig.kodAppDefault) try {
                var e = G.userConfig.kodAppDefault;
                e = jsonDecode(htmlDecode(e)), $.isPlainObject(e) && (a = e)
            } catch (t) {}
            Hook.bind("rightMenu.show.menu-file,rightMenu.show.menu-tree-file", function(e, t) {
                if (e.hasClass("menu-tree-file")) var a = ui.tree.makeParam();
                else var a = ui.path.makeParam();
                var i = core.pathExt(a.path),
                    n = "hidden";
                if (kodApp.getApp(i)) {
                    var o = kodApp.getAppMenu(i);
                    t.find("li.open-with.context-menu-submenu").removeClass(n), t.find("ul.context-menu-list.open-with .context-menu-item").not(".open-with-first").remove(), $.contextMenu.menuAdd(o, ".menu-file", ".open-with-first"), $.contextMenu.menuAdd(o, ".menu-tree-file", ".open-with-first")
                } else t.find("li.open-with.context-menu-submenu").addClass(n)
            }), Hook.trigger("kodApp.ready")
        };
    return g(), {
        debug: function() {
            return {
                appList: e,
                openDefault: t,
                openUser: a
            }
        },
        add: n,
        remove: s,
        appSupportCheck: m,
        appSupportSet: v,
        getApp: r,
        getAppBind: o,
        getAppMenu: p,
        setLastOpenTarget: l,
        getLastOpenTarget: c,
        setOpenUser: u,
        setOpenUserLocal: f,
        clearOpenUser: h,
        open: d
    }
}), define("app/app/editor", [], function() {
    kodApp.add({
        name: "aceEditor",
        title: LNG["Plugin.default.aceEditor"],
        sort: 0,
        ext: "txt,textile,oexe,inc,csv,log,asc,tsv,lnk,url,webloc,meta,localized,xib,xsd,storyboard,plist,csproj,pch,pbxproj,local,xcscheme,manifest,vbproj,strings,jshintrc,sublime-project,readme,changes,changelog,version,license,changelog,abap,abc,as,asp,aspx,ada,adb,htaccess,htgroups,htgroups,htpasswd,asciidoc,adoc,asm,a,ahk,bat,cmd,cpp,c,cc,cxx,h,hh,hpp,ino,c9search_results,cirru,cr,clj,cljs,cbl,cob,coffee,cf,cson,cakefile,cfm,cs,css,curly,d,di,dart,diff,patch,dockerfile,dot,dummy,dummy,e,ge,ejs,ex,exs,elm,erl,hrl,frt,fs,ldr,ftl,gcode,feature,.gitignore,glsl,frag,vert,gbs,go,groovy,haml,hbs,handlebars,tpl,mustache,hs,hx,html,hta,htm,xhtml,eex,html.eex,erb,rhtml,html.erb,ini,inf,conf,cfg,prefs,io,jack,jade,java,ji,jl,jq,js,jsm,json,jsp,jsx,latex,ltx,bib,lean,hlean,less,liquid,lisp,ls,logic,lql,lsl,lua,lp,lucene,Makefile,makemakefile,gnumakefile,makefile,ocamlmakefile,make,md,markdown,mask,matlab,mz,mel,mc,mush,mysql,nc,nix,nsi,nsh,m,mm,ml,mli,pas,p,pl,pm,pgsql,php,phtml,shtml,php3,php4,php5,phps,phpt,aw,ctp,module,ps1,praat,praatscript,psc,proc,plg,prolog,properties,proto,py,r,cshtml,rd,rhtml,rst,rb,ru,gemspec,rake,guardfile,rakefile,gemfile,rs,sass,scad,scala,scm,sm,rkt,oak,scheme,scss,sh,bash,bashrc,sjs,smarty,tpl,snippets,soy,space,sql,sqlserver,styl,stylus,svg,swift,tcl,tex,toml,twig,swig,ts,typescript,str,vala,vbs,vb,vm,v,vh,sv,svh,vhd,vhdl,wlk,wpgm,wtest,xml,rdf,rss,wsdl,xslt,atom,mathml,mml,xul,xbl,xaml,xq,yaml,yml,vcproj,vcxproj,filters,cer,reg,config,pem,srt,ass,lrc,opf,ncx",
        icon: G.staticPath + "images/file_icon/icon_app/ace.png",
        callback: function(e) {
            var t = ShareData.frameTop();
            if (t.Editor !== void 0) return t.Editor.add(urlEncode(e)), void 0;
            if (core.isApp("editor")) return ShareData.frameChild("OpenopenEditor", function(t) {
                t.Editor.add(urlEncode(e))
            }), void 0;
            if (ShareData.frameTop("OpenopenEditor")) {
                var a = t.$.dialog.list.openEditor,
                    i = 0;
                a && "hidden" == $(a.DOM.wrap).css("visibility") && (i = 200, a.display(!0).zIndex().focus()), setTimeout(function() {
                    ShareData.frameTop("OpenopenEditor", function(t) {
                        t.Editor.add(urlEncode(e))
                    })
                }, i)
            } else {
                var n = G.appHost + "editor/edit#filename=" + urlEncode(e);
                G.sharePage !== void 0 && (n = G.appHost + "share/edit&user=" + G.user + "&sid=" + G.sid + "#filename=" + urlEncode(e));
                var o = htmlEncode(urlDecode(core.pathThis(e)));
                core.openDialog(n, core.icon("edit"), o, "openEditor")
            }
        }
    });
    var e = ShareData.frameTop();
    e.Config && "editor" == e.Config.pageApp && kodApp.setOpenUserLocal(!1, "aceEditor")
}), define("app/app/openWith", [], function() {
    kodApp.add({
        name: "appOpenSetting",
        title: LNG["Explorer.UI.appSetDefault"],
        ext: "",
        icon: G.staticPath + "images/file_icon/icon_others/setting.png",
        callback: function(e, t) {
            var a = "<ul class='tab-group {{if !apps}}hidden{{/if}}' role='tablist'>				<li class='tab-item {{if apps}}active{{/if}}'>					<a href='#app-list-support'aria-controls='app-list-support' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeSupport']}}</a>				</li>				<li class='tab-item {{if !apps}}active{{/if}}' >					<a href='#app-list_all' aria-controls='app-list_all' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeAll']}}</a>				</li>			</ul>			<div class='tab-content'>				<div class='app-list tab-pane {{if apps}}active{{/if}}' id='app-list-support'>					{{each apps app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}					<div class='clear'></div>				</div>				<div class='app-list tab-pane {{if !apps}}active{{/if}}' id='app-list_all'>					{{each appAll app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}				</div>			</div>			<div class='bottom mt-10'>				<input class='kui-checkbox size-small' type='checkbox' id='app-default-checkbox' {{if apps}}checked='true'{{/if}}/>				<label for='app-default-checkbox'>{{LNG['Explorer.UI.appAwaysOpen']}}</label>			</div>",
                i = kodApp.getApp(t),
                n = !1;
            _.isArray(i) && (n = i[0].name);
            var o = template.compile(a),
                s = o({
                    LNG: LNG,
                    apps: i,
                    defaultApp: n,
                    appAll: kodApp.getApp()
                }),
                r = $.dialog({
                    id: "dialog-app-select",
                    className: "menu-empty",
                    padding: 0,
                    fixed: !0,
                    ico: core.icon("search"),
                    resize: !0,
                    title: LNG["Explorer.UI.selectAppDesc"],
                    width: 480,
                    height: 360,
                    padding: "20px",
                    content: s,
                    ok: function() {
                        return l()
                    }
                }),
                l = function() {
                    var a = $("#app-default-checkbox").prop("checked"),
                        i = $(".app-list.active .app-item.select").attr("data-app");
                    return i ? (r.close(), kodApp.open(e, t, i), a && kodApp.setOpenUser(t, i), !0) : (Tips.tips(LNG["Explorer.UI.selectAppWarning"], "warning"), !1)
                };
            $(".tab-group .tab-item").die("click").live("click", function() {
                var e = $(this).find("[aria-controls]").attr("aria-controls");
                "app-list-support" == e ? $("#app-default-checkbox").prop("checked", !0) : $("#app-default-checkbox").prop("checked", !1)
            }), $(".app-item").die("click").live("click", function() {
                $(this).parent().find(".select").removeClass("select"), $(this).addClass("select")
            }).die("dblclick").live("dblclick", function() {
                l()
            })
        }
    })
}), define("app/app/html", [], function() {
    var e = function(e) {
        return void 0 == e ? !1 : 0 === e.indexOf("http") ? !0 : G.shareInfo || core.pathReadable(e) ? !0 : (Tips.tips(LNG.no_permission_read_all, !1), core.playSound("error"), !1)
    };
    Hook.bind("kodApp.open.before", function(t) {
        return "folder" == t.ext ? (core.isApp("explorer") || isWap() ? ui.path.list(t.path + "/") : core.explorer(t.path), !0) : e(t.path) ? ("file" == t.ext && (t.ext = ""), void 0) : !0
    }), kodApp.openUnknow = function(e, t) {
        void 0 == t && (t = "");
        var a = G.appHost + "pluginApp/index&search=" + core.pathExt(e),
            i = "kodApp.open(pathHashDecode('" + pathHashEncode(e) + "'),false,'appOpenSetting');",
            n = "kodApp.open(pathHashDecode('" + pathHashEncode(e) + "'),false,'aceEditor');",
            o = "kodApp.download(pathHashDecode('" + pathHashEncode(e) + "'));",
            s = "core.openWindow('" + a + "');",
            r = LNG.unknow_file_try + '<a class="pl-5 pr-5" href="javascript:void(0);" onclick="',
            l = '<div class="unknow-file can-select" style="word-break:break-all;">				<div class="grey-8 bold mb-20">' + LNG.unknow_file_tips + "<br/>" + t + '</div>			    <div class="mt-5">1.' + r + i + '">' + LNG["Explorer.UI.openWith"] + '</a></div>			    <div class="mt-5">2.' + r + n + '">' + LNG["Explorer.UI.openWithText"] + '</a></div>			    <div class="mt-5">3.' + r + o + '">' + LNG.unknow_file_download + '</a></div>				<div class="mt-20">' + r + s + '">' + LNG.PluginCenter + "</a>" + LNG.unknow_plugin_search + "</div>			</div>";
        $.dialog({
            fixed: !0,
            icon: "warning",
            title: LNG.unknow_file_title,
            padding: "20px 50px",
            content: l,
            cancel: !0
        }), $(".unknow-file a").unbind("click").bind("click", function(e) {
            return $(this).parents(".artDialog").data("artDialog").close(), stopPP(e)
        })
    }, kodApp.add({
        name: "download",
        title: LNG.download,
        hidden: !0,
        icon: "x-item-file x-html",
        callback: function(t) {
            if (e(t)) {
                var a = t;
                "http" != t.substr(0, 4) && (a = G.appHost + "explorer/fileDownload&accessToken=" + G.accessToken + "&path=" + urlEncode(t), G.sharePage !== void 0 && (a = G.appHost + "share/fileDownload&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(t))), $.dialog({
                    icon: "succeed",
                    title: !1,
                    time: 1.5,
                    content: LNG.download_ready + "..."
                }), isWap() ? window.open(a) : $('<iframe src="' + a + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
            }
        }
    }), kodApp.download = function(e) {
        kodApp.open(e, "", "download")
    }, kodApp.openWindow = function(e) {
        kodApp.open(e, "", "browserOpen")
    }, kodApp.add({
        name: "browserOpen",
        title: LNG.open_ie,
        sort: -100,
        icon: "x-item-file x-html",
        callback: function(t) {
            if (e(t)) {
                var a = core.path2url(t);
                isWap() ? window.location.href = a : window.open(a)
            }
        }
    }), kodApp.add({
        name: "swfPlayer",
        title: "Flash Player",
        ext: "swf",
        icon: "x-item-file x-swf",
        callback: function(e, t) {
            $.dialog({
                resize: !0,
                fixed: !0,
                ico: core.icon(t),
                title: core.pathThis(e),
                width: "75%",
                height: "65%",
                padding: 0,
                content: core.createFlash(core.path2url(e))
            })
        }
    }), kodApp.add({
        name: "webLink",
        title: "webLink",
        ext: "url,webloc",
        sort: 10,
        icon: "x-item-file x-html",
        callback: function(e, t) {
            core.fileGet(e, function(a) {
                if ("url" == t) {
                    var i = a.match(/URL=(.*)/);
                    if (i.length >= 2) return window.open(i[1])
                } else if ("webloc" == t) try {
                    var n = $($.parseXML(a)),
                        o = n.find("string").text();
                    return window.open(o), void 0
                } catch (s) {}
                kodApp.open(e, t, "editor")
            })
        }
    }), kodApp.add({
        name: "htmlView",
        title: LNG["Plugin.default.htmlView"],
        ext: "htm,html,shtml",
        sort: 10,
        icon: "x-item-file x-html",
        callback: function(e) {
            var t = core.path2url(e);
            core.openDialog(t, core.icon("html"), core.pathThis(e))
        }
    }), kodApp.add({
        name: "pdfView",
        title: "PDF Simple",
        ext: "pdf",
        sort: 0,
        icon: "x-item-file x-pdf",
        callback: function(e, t) {
            var a = core.path2url(e),
                i = "pdf" + UUID(),
                n = '<div id="' + i + '" style="height:100%;">			<a href="' + a + '" target="_blank" style="display:block;margin:0 auto;margin-top:80px;font-size:16px;text-align:center;">' + LNG.error + " " + LNG.download + " PDF</a></div>";
            $.dialog({
                resize: !0,
                fixed: !0,
                ico: core.icon(t),
                title: core.pathThis(e),
                width: "80%",
                height: "75%",
                padding: 0,
                content: n
            }), PDFObject.embed(a, "#" + i)
        }
    }), kodApp.add({
        name: "oexeOpen",
        title: LNG["kodApp.oexe.open"],
        ext: "oexe",
        sort: 100,
        icon: " x-item-file x-oexe",
        callback: function(e) {
            core.fileGet(e, function(t) {
                var a = jsonDecode(t);
                a.name = core.pathThis(e), core.openApp(a)
            })
        }
    }), kodApp.add({
        name: "oexeEdit",
        title: LNG["kodApp.oexe.edit"],
        ext: "oexe",
        sort: 50,
        icon: "icon-edit ",
        callback: function(e) {
            core.fileGet(e, function(t) {
                var a = jsonDecode(t);
                a.name = core.pathThis(e), a.path = e, ui.path.pathOperate.appEdit(a)
            })
        }
    });
    var t = {
        createApp: {
            name: LNG.app_create,
            className: "createApp newfile",
            icon: "icon-puzzle-piece x-item-file x-oexe",
            callback: function() {
                ui.path.pathOperate.appEdit(0, 0, "userAdd")
            }
        }
    };
    $.contextMenu.menuAdd(t, ".menu-body-main", ".app-install"), $.contextMenu.menuAdd(t, ".toolbar-path-more", ".app-install"), $.contextMenu.menuAdd(t, ".bodymain", ".app-install"), Hook.bind("rightMenu.show", function(e, t, a) {
        var i = [".menu-folder", ".menu-file", ".menu-tree-folder", ".menu-tree-file", ".menu-tree-folder-fav"];
        if (a.find(".context-menu-submenu").fadeOut(0).delay(0).fadeIn(0), a.removeClass("menu-auto-fit"), a.inScreen() || a.addClass("menu-auto-fit"), ".menu-body-main" == e) {
            var n = a.find(".set-file-icon-size.context-menu-submenu");
            "icon" == G.userConfig.listType ? n.removeClass("hidden") : n.addClass("hidden")
        }
        if (_.include(i, e)) {
            var o = "disabled",
                s = ".cute,.rname,.remove",
                r = ".open,.open-text,.down,.share,.copy,.cute,.rname,.remove,.open-browser,.search,.more-action";
            t.hasClass("file-not-readable") ? a.find(r).addClass(o) : a.find(r).removeClass(o), t.hasClass("file-not-writeable") ? a.find(s).addClass(o) : a.find(s).removeClass(o)
        }
    }), Hook.bind("rightMenu.show.menu-body-main", function(e, t) {
        var a = ".upload,.past,.newfolder,.newfile",
            i = "disabled";
        _.get(G, "jsonData.info.canUpload") ? t.find(a).removeClass(i) : t.find(a).addClass(i)
    }), Hook.bind("rightMenu.show.menu-file", function(e, t) {
        if ($(".context-menu-active").hasClass("menu-tree-file")) var a = ui.tree.makeParam();
        else var a = ui.path.makeParam();
        var i = core.pathExt(a.path),
            n = "hidden";
        inArray(["jpg", "jpeg", "png"], i) ? t.find(".set-background").removeClass(n) : t.find(".set-background").addClass(n)
    });
    var a = function() {
        var e = ".close-item,.refresh,.newfile,.past,.info",
            t = ".open-browser",
            a = ".explorer,.create-project,.open-project",
            i = ".close-item,.newfile,.refresh,.past,.down,.copy,.cute,.remove,.more-action,.clone,.info,.zip,.zip-zip,.zip-tar,.zip-tgz",
            n = ".newfile,.cute,.past,.rname,.zip,.remove,.clone,.create-link-home,.create-link,.create-project",
            o = $(".menu-tool-path"),
            s = "disabled",
            r = ui.fileLight.fileListSelect();
        o.find(".context-menu-item").addClass(s), 0 == r.length ? o.find(e).removeClass(s) : 1 == r.length ? (o.find(".context-menu-item").removeClass(s), "folder" == ui.fileLight.type(r) ? o.find(t).addClass(s) : o.find(a).addClass(s)) : r.length > 1 && o.find(i).removeClass(s), G.jsonData && G.jsonData.info && G.jsonData.info.canUpload === !1 && o.find(n).filter(":not(." + s + ")").addClass(s)
    };
    Hook.bind("explorer.fileSelect.init", function() {
        ui.fileLight.listNumberSet()
    }), Hook.bind("explorer.fileSelect.change", function() {
        a(), ui.fileLight.selectNumSet()
    }), Hook.bind("rightMenu.show.toolbar-path-more", function() {
        a()
    }), Hook.bind("rightMenu.initFinished", function() {
        if (1 != G.isRoot) {
            var e = "hidden";
            if (core.authCheck("explorer.fileDownload") || (kodApp.remove("browserOpen"), $(".context-menu-list .down,.context-menu-list .download").addClass(e), $(".context-menu-list .share").addClass(e), $(".context-menu-list .open-text").addClass(e), $(".pathinfo .open-window").addClass(e), $(".context-menu-list .open-browser").addClass(e)), core.authCheck("explorer.search") || $(".context-menu-list .search").addClass(e), core.authCheck("explorer.mkdir") || $(".context-menu-list .newfolder").addClass(e), core.authCheck("userShare.set") || $(".context-menu-list .share").remove(), core.authCheck("explorer.mkfile") || $(".context-menu-list .newfile,.tool-path-newfile").addClass(e), core.authCheck("explorer.mkdir") || $(".context-menu-list .newfolder,[data-action=newfolder]").addClass(e), core.authCheck("explorer.pathCopy") || ($(".context-menu-list .cute").addClass(e), $(".context-menu-list .copy").addClass(e)), !core.authCheck("explorer.fileUpload")) {
                $(".context-menu-list .upload").addClass(e);
                var t = $("[data-action=upload-more]");
                t.exists() && t.parent().addClass(e)
            }
        }
    })
}), define("app/common/tpl/copyright.html", [], '<div class="dialog-copyright-content">\n	<div class="title">\n		<div class="logo">\n			<i class="icon-cloud"></i>\n			{{if kod.window.core.versionType==\'A\'}}KodExplorer {{else}} {{LNG.kod_name}} {{/if}} v{{G.version}}\n		</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{@LNG.copyright_desc}}</p>\n		<div>{{@LNG.copyright_contact}}</div>\n		<div>{{@LNG.copyright_info}}</div> \n	</div>\n</div>\n'), define("app/common/tpl/themeDIY.html", [], "@media screen and (max-width:100000px) {\n	body .full-background{\n		position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\n		background-color: #020202;background-size: 100% 100%;\n	}\n\n	{{if blurSize= (bgBlur==0?0:10) }}{{/if}}\n	body .full-background:before{\n		-webkit-filter: blur({{blurSize}}px);\n		-moz-filter: blur({{blurSize}}px);\n		-ms-filter: blur({{blurSize}}px);\n		filter: blur({{blurSize}}px);\n	}\n	{{if bgType == 'image'}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left,\n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-image:url({{bgImage}});\n		}\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-size:100%;\n		}\n	{{else}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left, \n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background:{{endColor}};\n			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='{{startColor}}', endColorstr='{{endColor}}');\n			background-image: -webkit-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -moz-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -o-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -ms-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n		}\n	{{/if}}\n}\n"), define("app/src/app/page", [], function() {
    var e, t = function() {
            e = location.hash.split("#", 2)[1], e || (e = "all"), n(e), $("ul.setting a").click(function() {
                e != $(this).attr("data-type") && (e = $(this).attr("data-type"), n(e))
            }), $(".app-model [action]").die("click").live("click", function(e) {
                return a($(this).attr("action"), $(this)), $(this).parents(".dropdown-menu").exists() && $(this).parents(".btn-group").removeClass("open"), stopPP(e)
            })
        },
        a = function(e, t) {
            if ("createApp" == e) return window.parent && window.parent.ui.path.pathOperate.appEdit("", "", "rootAdd"), void 0;
            t.hasClass("app-li") || (t = t.parents(".app-li"));
            var a = t.attr("data-app"),
                i = jsonDecode(base64Decode(a));
            switch (e) {
                case "createApp":
                    window.parent && window.parent.ui.path.pathOperate.appEdit("", "", "rootAdd");
                    break;
                case "preview":
                    core.openApp(i);
                    break;
                case "add":
                    var o = "/";
                    ShareData.frameTop("", function(e) {
                        o = e.G.thisPath
                    });
                    var s = urlEncode(o + i.name),
                        r = G.appHost + "app/userApp&action=add&path=" + s;
                    $.ajax({
                        url: r,
                        dataType: "json",
                        type: "POST",
                        data: {
                            data: urlEncode(jsonEncode(i))
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            Tips.tips(e.data, e.code), e.code && ShareData.frameTop("", function(e) {
                                e.ui.f5()
                            })
                        }
                    });
                    break;
                case "edit":
                    ShareData.frameTop("", function(e) {
                        e.ui.path.pathOperate.appEdit(i, "", "rootEdit")
                    });
                    break;
                case "del":
                    $.dialog({
                        id: "dialog_app_remove",
                        icon: "question",
                        padding: 20,
                        width: 200,
                        lock: !0,
                        background: "#000",
                        opacity: .3,
                        content: LNG.remove_info,
                        ok: function() {
                            $.ajax({
                                url: G.appHost + "app/del&name=" + urlEncode(i.name),
                                dataType: "json",
                                error: core.ajaxError,
                                success: function(e) {
                                    Tips.tips(e.data, e.code), e.code && n()
                                }
                            })
                        },
                        cancel: !0
                    });
                    break;
                default:
            }
        },
        i = function(e) {
            var t = "",
                a = "<button type='button' class='btn btn-sm btn-default dropdown-toggle' data-toggle='dropdown'>					<span class='caret'></span>					<span class='sr-only'></span>				</button>				<ul class='dropdown-menu' role='menu'>					<li><a action='edit' href='javascript:;'><i class='icon-edit'></i>" + LNG.button_edit + "</a></li>					<li><a action='del' href='javascript:;'><i class='icon-trash'></i>" + LNG.button_del + "</a></li>				</ul>";
            G.isRoot || (a = "");
            for (var i in e)
                if (e[i]) {
                    var n = e[i].icon; - 1 == n.search(G.staticPath) && "http" != n.substring(0, 4) && (n = G.staticPath + "images/file_icon/icon_app/" + n), t += "<li class='app-li ripple-item' action='preview' data-app=" + base64Encode(jsonEncode(e[i])) + ">				<div class='icon'><img src='" + n + "' draggable='false' style='margin-top:15px;'></div>				<div class='text'>					<div class='name'>" + e[i].name + "</div>					<div class='copyright'>" + e[i].desc + "</div>				</div>				<div class='btn-group action'>					<button type='button' class='btn btn-sm btn-default' action='add'>" + LNG.button_add + "</button>" + a + "</div></li>"
                }
            for (var i = 0; 20 > i; i++) t += "<div class='flex-empty'></div>";
            return t += "<div style='clear:both;'></div>"
        },
        n = function(t) {
            (void 0 == t || "" == t) && (t = e), $(".selected").removeClass("selected"), $('ul.setting a[data-type="' + t + '"]').addClass("selected"), $(".main").find(".h1").html("<i class='" + $(".selected i").attr("class") + "'></i>" + $(".selected").text());
            var a = $(".main .app-list");
            $.ajax({
                url: G.appHost + "app/get&group=" + t,
                dataType: "json",
                beforeSend: function() {},
                success: function(e) {
                    a.html(i(e.data)), $("body").scrollTop(0)
                }
            })
        };
    return {
        reload: n,
        init: t
    }
});