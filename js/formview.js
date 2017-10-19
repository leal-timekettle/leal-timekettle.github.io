function() {
  if ($(this).hasClass("disabled") || $(this).prop("disabled")) {
    return false
  }
  var k = $("#_id").val() ? "edit" : "new";
  if (k == "new" && "1" == ADVPERM.ADV && !"1" == ADVPERM.ADD) {
    $.alert("没有新增数据的权限，请与管理员联系。");
    return false
  }
  $.each(RULE.FIELDSRULE || [], function(s, t) {
    $.each(t.RULEFLD || [], function(u, v) {
      if (!$("#" + v).is(":visible")) {
        $("#" + v + ",#au" + v).setValues({}, true)
      }
    })
  });
  calShopCard();
  if (!d()) {
    $("#fields").find("li.error:first").find(":input").focus();
    return false
  }
  $(this).prop("disabled", true);
  $.showStatus("正在验证数据...");
  if ($("#liCaptcha").length > 0) {
    isValidate = f($("#liCaptcha").find(":text"))
  }
  if (!isValidate) {
    $("#fields").find("li.error:first").find(":input").focus();
    return false
  }
  var o = $("li[uniq='1']");
  if (o.length > 0) {
    o.each(function(t, s) {
      isValidate = c($(s).find(":input[name]"));
      if (!isValidate) {
        $("#fields").find("li.error:first").find(":input").focus();
        return false
      }
    })
  }
  if (!isValidate) {
    $("#fields").find("li.error:first").find(":input").focus();
    return false
  }
  $("#fields input.authcode").each(function(s, t) {
    var u = $(t);
    isValidate = a($(u).parent().parent());
    if (!isValidate) {
      $("#fields").find("li.error:first").find(":input").focus();
      return false
    }
  });
  if (!isValidate) {
    $("#fields").find("li.error:first").find(":input").focus();
    return false
  }
  var n = $("li[ctlmt='DAY'], li[ctlmt='ALL']");
  if (n.length > 0) {
    isValidate = e();
    if (!isValidate) {
      $("#fields").find("li.error:first").find(":input").focus();
      return false
    }
  }
  if (!isValidate) {
    $("#fields").find("li.error:first").find(":input").focus();
    $("#btnSubmit,#btnSave,#btnActSave").prop("disabled", false);
    $.hideStatus();
    return false
  } else {
    var k = $("#_id").val() ? "edit" : "new";
    if (k === "new") {
      var r = parseFloat($("#TMOUT").val());
      $("#TMOUT").val(Math.round((new Date().getTime() - r) / 1000))
    }
    var g = $("#form1").find("li[typ!=table]").getValues();
    var m = $("#form1>input").getValues();
    $.mergJSON(g, m);
    $.each($("#form1>input[type='hidden']"), function(u, t) {
      var s = $(t).attr("name");
      var v = $(t).val();
      g[s] = v
    });
    var q = $("#fields li[typ=table]");
    $.each(q, function(u, v) {
      var t = $(v).find("div.tbl").attr("name");
      g[t] = [];
      var s = $(v).find("div.tbl tr:gt(0)");
      $.each(s, function(x, y) {
        var z = $(y).getValues();
        g[t].push(z)
      })
    });
    $.each(g, function(t, s) {
      if (/^t\d/.test(t)) {
        delete g[t]
      }
    });
    if ($(this).attr("id") === "btnSubmit") {
      if ($("#FRMID").attr("autofill") == "1") {
        localStorage.setItem($("#FRMID").val(), JSON.stringify(g))
      } else {
        localStorage.removeItem($("#FRMID").val())
      }
      $.hideStatus();
      var l = "/web/formview/" + $("#FRMID").val();
      $.postJSON(l, g, function(s) {
        var t = s && s.url;
        if (!t) {
          t = "/web/viewresult"
        }
        window.location.href = t
      })
    } else {
      $.showStatus("正在保存数据...");
      g.INITTIME = $.trim(INITTIME.toString());
      g.FRMNM = FRM.FRMNM;
      $.postJSON("/web/entries/save", g, function(s) {
        if (s && s.ERRMSG) {
          alert(s.ERRMSG);
          $.hideStatus();
          return
        }
        $.closeLightBox();
        if (window.query) {
          if (k === "new") {
            query(null, "FIRST", PAGESIZE, $("#entriesGrid").datagrid("getSortString"), $("#entriesGrid"))
          } else {
            if ("1" == ADVPERM.ADV && "1" == ADVPERM.FLT) {
              query(null, "FIRST", PAGESIZE, $("#entriesGrid").datagrid("getSortString"), $("#entriesGrid"))
            } else {
              var t = $("#entriesGrid"),
                x = t.data("rowsData"),
                v = t.data("total"),
                u = t.find("tbody>tr.rowSelected").index();
              if (s.REALNAME && s.REALNAME != s.CBY) {
                s.CBY = $.format("{0}({1})", s.CBY, s.REALNAME)
              }
              x[u] = s;
              t.data("rowsData", x);
              t.datagrid("fillData", {
                total: v,
                rows: x
              });
              t.find("tbody>tr:eq(" + u + ")").addClass("rowSelected");
              $("a.view").click(function() {
                setTimeout(function() {
                  $("#btnActView").trigger("click")
                }, 150)
              });
              $("a.edit").click(function() {
                setTimeout(function() {
                  $("#btnActEdit").trigger("click")
                }, 150)
              });
              window.selectedData = s;
              $("#btnActVie").trigger("click")
            }
          }
          $.hideStatus()
        } else {
          if (!window.isForMobile) {
            alert("保存成功")
          } else {
            $.malert("保存成功，正在跳转...", function() {
              window.location.href = document.referrer + $.format("#l{0}", liIndex || 0)
            })
          }
          $.hideStatus()
        }
        $("#btnSubmit,#btnSave,#btnActSave").prop("disabled", false)
      });
      return false
    }
  }
  return false
}