/*! Tablesaw - v1.0.4 - 2015-02-19
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2015 Filament Group; Licensed MIT */
(function(n){var t=document.createElement("div"),r=t.getElementsByTagName("i"),i=n(document.documentElement);if(t.innerHTML="<!--[if lte IE 8]><i><\/i><![endif]-->",r[0]&&i.addClass("ie-lte8"),"querySelector"in document&&(!window.blackberry||window.WebKitPoint)&&!window.operamini)i.addClass("tablesaw-enhanced"),n(function(){n(document).trigger("enhance.tablesaw")});else return})(jQuery);typeof Tablesaw=="undefined"&&(Tablesaw={i18n:{modes:["Stack","Swipe","Toggle"],columns:'Col<span class="a11y-sm">umn<\/span>s',columnBtnText:"Columns",columnsDialogError:"No eligible columns.",sort:"Sort"}});Tablesaw.config||(Tablesaw.config={}),function(n){var t="table",r={toolbar:"tablesaw-bar"},u={create:"tablesawcreate",destroy:"tablesawdestroy",refresh:"tablesawrefresh"},f="stack",e="table[data-tablesaw-mode],table[data-tablesaw-sortable]",i=function(t){if(!t)throw new Error("Tablesaw requires an element.");this.table=t;this.$table=n(t);this.mode=this.$table.attr("data-tablesaw-mode")||f;this.init()};i.prototype.init=function(){this.$table.attr("id")||this.$table.attr("id",t+"-"+Math.round(Math.random()*1e4));this.createToolbar();var n=this._initCells();this.$table.trigger(u.create,[this,n])};i.prototype._initCells=function(){var t,i=this.table.querySelectorAll("thead tr"),r=this;return n(i).each(function(){var u=0;n(this).children().each(function(){var e=parseInt(this.getAttribute("colspan"),10),o=":nth-child("+(u+1)+")",f;if(t=u+1,e)for(f=0;f<e-1;f++)u++,o+=", :nth-child("+(u+1)+")";this.cells=r.$table.find("tr").not(n(i).eq(0)).not(this).children(o);u++})}),t};i.prototype.refresh=function(){this._initCells();this.$table.trigger(u.refresh)};i.prototype.createToolbar=function(){var t=this.$table.prev("."+r.toolbar);t.length||(t=n("<div>").addClass(r.toolbar).insertBefore(this.$table));this.$toolbar=t;this.mode&&this.$toolbar.addClass("mode-"+this.mode)};i.prototype.destroy=function(){this.$table.prev("."+r.toolbar).each(function(){this.className=this.className.replace(/\bmode\-\w*\b/gi,"")});var i=this.$table.attr("id");n(document).unbind("."+i);n(window).unbind("."+i);this.$table.trigger(u.destroy,[this]);this.$table.removeAttr("data-tablesaw-mode");this.$table.removeData(t)};n.fn[t]=function(){return this.each(function(){var r=n(this),u;r.data(t)||(u=new i(this),r.data(t,u))})};n(document).on("enhance.tablesaw",function(i){n(i.target).find(e)[t]()})}(jQuery),function(n,t){var i={stackTable:"tablesaw-stack",cellLabels:"tablesaw-cell-label",cellContentLabels:"tablesaw-cell-content"},f={obj:"tablesaw-stack"},r={labelless:"data-tablesaw-no-labels",hideempty:"data-tablesaw-hide-empty"},u=function(n){this.$table=t(n);this.labelless=this.$table.is("["+r.labelless+"]");this.hideempty=this.$table.is("["+r.hideempty+"]");this.labelless||(this.allHeaders=this.$table.find("th"));this.$table.data(f.obj,this)};u.prototype.init=function(n){if(this.$table.addClass(i.stackTable),!this.labelless){var u=t(this.allHeaders),f=this.hideempty;u.each(function(){var h=t(this),u=t(this.cells).filter(function(){return!t(this).parent().is("["+r.labelless+"]")&&(!f||!t(this).is(":empty"))}),c=u.not(this).filter("thead th").length&&" tablesaw-cell-label-top",l=h.find(".tablesaw-sortable-btn"),e=l.length?l.html():h.html(),o,s;e!==""&&(c?(o=parseInt(t(this).attr("colspan"),10),s="",o&&(s="td:nth-child("+o+"n + "+n+")"),u.filter(s).prepend("<b class='"+i.cellLabels+c+"'>"+e+"<\/b>")):(u.wrapInner("<span class='"+i.cellContentLabels+"'><\/span>"),u.prepend("<b class='"+i.cellLabels+"'>"+e+"<\/b>")))})}};u.prototype.destroy=function(){this.$table.removeClass(i.stackTable);this.$table.find("."+i.cellLabels).remove();this.$table.find("."+i.cellContentLabels).each(function(){t(this).replaceWith(this.childNodes)})};t(document).on("tablesawcreate",function(n,t,i){if(t.mode==="stack"){var r=new u(t.table);r.init(i)}});t(document).on("tablesawdestroy",function(n,i){i.mode==="stack"&&t(i.table).data(f.obj).destroy()})}(this,jQuery),function(n){var t="tablesawbtn",i=".btn",r={_create:function(){return n(this).each(function(){n(this).trigger("beforecreate."+t)[t]("_init").trigger("create."+t)})},_init:function(){var r=n(this),i=this.getElementsByTagName("select")[0];return i&&n(this).addClass("btn-select")[t]("_select",i),r},_select:function(t){var i=function(t,i){var e=n(i).find("option"),o,r,f,u,s;if(e.each(function(){var n=this;n.selected&&(o=document.createTextNode(n.text))}),f=t.childNodes,e.length>0)for(u=0,s=f.length;u<s;u++)r=f[u],r&&r.nodeType===3&&t.replaceChild(o,r)};i(this,t);n(this).bind("change refresh",function(){i(this,t)})}};n.fn[t]=function(i,r,u,f){return this.each(function(){if(i&&typeof i=="string")return n.fn[t].prototype[i].call(this,r,u,f);if(n(this).data(t+"active"))return n(this);n(this).data(t+"active",!0);n.fn[t].prototype._create.call(this)})};n.extend(n.fn[t].prototype,r);n(document).on("enhance",function(r){n(i,r.target)[t]()})}(jQuery),function(n,t){var i=function(n){this.$table=t(n);this.classes={columnToggleTable:"tablesaw-columntoggle",columnBtnContain:"tablesaw-columntoggle-btnwrap tablesaw-advance",columnBtn:"tablesaw-columntoggle-btn tablesaw-nav-btn down",popup:"tablesaw-columntoggle-popup",priorityPrefix:"tablesaw-priority-",toolbar:"tablesaw-bar"};this.headers=this.$table.find("tr:first > th");this.$table.data("tablesaw-coltoggle",this)};i.prototype.init=function(){function l(){n.addClass("visible");u.removeClass("down").addClass("up");t(document).unbind("click."+i,h);window.clearTimeout(c);c=window.setTimeout(function(){t(document).one("click."+i,h)},15)}function h(r){r&&t(r.target).closest("."+f.classes.popup).length||(t(document).unbind("click."+i),u.removeClass("up").addClass("down"),n.removeClass("visible"))}var i,e,u,o,r,n,f=this,s,c;this.$table.addClass(this.classes.columnToggleTable);i=this.$table.attr("id");e=i+"-popup";n=t("<div class='"+this.classes.columnBtnContain+"'><\/div>");u=t("<a href='#"+e+"' class='btn btn-micro "+this.classes.columnBtn+"' data-popup-link><span>"+Tablesaw.i18n.columnBtnText+"<\/span><\/a>");o=t("<div class='dialog-table-coltoggle "+this.classes.popup+"' id='"+e+"'><\/div>");r=t("<div class='btn-group'><\/div>");s=!1;t(this.headers).not("td").each(function(){var n=t(this),i=n.attr("data-tablesaw-priority"),u=n.add(this.cells);i&&i!=="persist"&&(u.addClass(f.classes.priorityPrefix+i),t("<label><input type='checkbox' checked>"+n.text()+"<\/label>").appendTo(r).children(0).data("cells",u),s=!0)});s||r.append("<label>"+Tablesaw.i18n.columnsDialogError+"<\/label>");r.appendTo(o);r.find('input[type="checkbox"]').on("change",function(n){var i=n.target.checked;t(n.target).data("cells").toggleClass("tablesaw-cell-hidden",!i).toggleClass("tablesaw-cell-visible",i);f.$table.trigger("tablesawcolumns")});u.appendTo(n);n.appendTo(this.$table.prev("."+this.classes.toolbar));u.on("click.tablesaw",function(t){t.preventDefault();n.is(".visible")?h():l()});o.appendTo(n);this.$menu=r;t(window).on("resize."+i,function(){f.refreshToggle()});this.refreshToggle()};i.prototype.refreshToggle=function(){this.$menu.find("input").each(function(){var n=t(this);this.checked=n.data("cells").eq(0).css("display")==="table-cell"})};i.prototype.refreshPriority=function(){var n=this;t(this.headers).not("td").each(function(){var r=t(this),i=r.attr("data-tablesaw-priority"),u=r.add(this.cells);i&&i!=="persist"&&u.addClass(n.classes.priorityPrefix+i)})};i.prototype.destroy=function(){this.$table.removeClass(this.classes.columnToggleTable);this.$table.find("th, td").each(function(){var n=t(this);n.removeClass("tablesaw-cell-hidden").removeClass("tablesaw-cell-visible");this.className=this.className.replace(/\bui\-table\-priority\-\d\b/g,"")})};t(document).on("tablesawcreate",function(n,t){if(t.mode==="columntoggle"){var r=new i(t.table);r.init()}});t(document).on("tablesawdestroy",function(n,i){i.mode==="columntoggle"&&t(i.table).data("tablesaw-coltoggle").destroy()})}(this,jQuery),function(n,t){function i(i){function l(n){return t(n.cells).add(n)}function d(n){l(n).removeClass("tablesaw-cell-hidden")}function g(n){l(n).addClass("tablesaw-cell-hidden")}function it(n){l(n).addClass("tablesaw-cell-persist")}function rt(n){return t(n).is('[data-tablesaw-priority="persist"]')}function ut(){i.removeClass(w);t("#"+u+"-persist").remove()}function ft(){var s="#"+u+".tablesaw-swipe ",f=[],h=i.width(),o=[],e,n;r.each(function(n){var i;rt(this)&&(i=t(this).outerWidth(),i<h*.75&&(o.push(n+"-"+i),f.push(s+" .tablesaw-cell-persist:nth-child("+(n+1)+") { width: "+i+"px; }")))});e=o.join("_");i.addClass(w);n=t("#"+u+"-persist");n.length&&n.data("hash")===e||(n.remove(),f.length&&t("<style>"+f.join("\n")+"<\/style>").attr("id",u+"-persist").data("hash",e).appendTo(tt))}function a(){var n=[],i;return f.each(function(r){var u=t(this),f=u.css("display")==="none"||u.is(".tablesaw-cell-hidden");if(f||i){if(f&&i)return n[1]=r,!1}else i=!0,n[0]=r}),n}function nt(){var n=a();return[n[1]-1,n[0]-1]}function et(n){return n?a():nt()}function v(n){return n[1]>-1&&n[1]<f.length}function ot(){var t=i.attr("data-tablesaw-swipe-media");return!t||"matchMedia"in n&&n.matchMedia(t).matches}function e(){var u;if(ot()){var h=20,f=i.parent().width(),e=[],n=0,o=[],s=r.length;r.each(function(i){var u=t(this),r=u.is('[data-tablesaw-priority="persist"]');e.push(r);n+=b[i]+(r?0:h);o.push(n);(r||n>f)&&s--});u=s===0;r.each(function(n){if(e[n]){it(this);return}o[n]<=f||u?(u=!1,d(this)):g(this)});k||ut();i.trigger("tablesawcolumns")}}function o(n){var t=et(n);v(t)&&(isNaN(t[0])&&(t[0]=n?0:f.length-1),k||ft(),g(f.get(t[0])),d(f.get(t[1])),i.trigger("tablesawcolumns"))}function s(n,t){return(n.touches||n.originalEvent.touches)[0][t]}var h=t("<div class='tablesaw-advance'><\/div>"),y=t("<a href='#' class='tablesaw-nav-btn btn btn-micro left' title='Previous Column'><\/a>").appendTo(h),c=t("<a href='#' class='tablesaw-nav-btn btn btn-micro right' title='Next Column'><\/a>").appendTo(h),p="disabled",w="tablesaw-fix-persist",r=i.find("thead th"),f=r.not('[data-tablesaw-priority="persist"]'),b=[],tt=t(document.head||"head"),u=i.attr("id"),k=t("html").is(".ie-lte8");if(!r.length)throw new Error("tablesaw swipe: no header cells found. Are you using <th> inside of <thead>?");i.css("width","auto");r.each(function(){b.push(t(this).outerWidth())});i.css("width","");h.appendTo(i.prev(".tablesaw-bar"));i.addClass("tablesaw-swipe");u||(u="tableswipe-"+Math.round(Math.random()*1e4),i.attr("id",u));y.add(c).click(function(n){o(!!t(n.target).closest(c).length);n.preventDefault()});i.bind("touchstart.swipetoggle",function(i){var u=s(i,"pageX"),h=s(i,"pageY"),r,f;t(n).off("resize",e);t(this).bind("touchmove",function(n){r=s(n,"pageX");f=s(n,"pageY");var t=Tablesaw.config.swipe;Math.abs(r-u)>t.horizontalThreshold&&Math.abs(f-h)<t.verticalThreshold&&n.preventDefault()}).bind("touchend.swipetoggle",function(){var i=Tablesaw.config.swipe;Math.abs(f-h)<i.verticalThreshold&&(r-u<-1*i.horizontalThreshold&&o(!0),r-u>i.horizontalThreshold&&o(!1));window.setTimeout(function(){t(n).on("resize",e)},300);t(this).unbind("touchmove touchend")})}).bind("tablesawcolumns.swipetoggle",function(){y[v(nt())?"removeClass":"addClass"](p);c[v(a())?"removeClass":"addClass"](p)}).bind("tablesawnext.swipetoggle",function(){o(!0)}).bind("tablesawprev.swipetoggle",function(){o(!1)}).bind("tablesawdestroy.swipetoggle",function(){var i=t(this);i.removeClass("tablesaw-swipe");i.prev(".tablesaw-bar").find(".tablesaw-advance").remove();t(n).off("resize",e);i.unbind(".swipetoggle")});e();t(n).on("resize",e)}t.extend(Tablesaw.config,{swipe:{horizontalThreshold:15,verticalThreshold:30}});t(document).on("tablesawcreate",function(n,t){t.mode==="swipe"&&i(t.$table)})}(this,jQuery),function(n){function u(t){return n.map(t.childNodes,function(t){var i=n(t);return i.is("input, select")?i.val():i.hasClass("tablesaw-cell-label")?void 0:n.trim(i.text())}).join("")}var t="tablesaw-sortable",f="table[data-"+t+"]",e="[data-"+t+"-switch]",r={defaultCol:"data-tablesaw-sortable-default-col"},i={head:t+"-head",ascend:t+"-ascending",descend:t+"-descending",switcher:t+"-switch",tableToolbar:"tablesaw-toolbar",sortButton:t+"-btn"},o={_create:function(i){return n(this).each(function(){var r=n(this).data("init"+t);if(r)return!1;n(this).data("init"+t,!0).trigger("beforecreate."+t)[t]("_init",i).trigger("create."+t)})},_init:function(){var f=n(this),s,o,c=function(){f.addClass(t)},l=function(t){n.each(t,function(t,r){n(r).addClass(i.head)})},a=function(t,r){n.each(t,function(t,u){var f=n("<button class='"+i.sortButton+"'/>");f.bind("click",{col:u},r);n(u).wrapInner(f)})},h=function(t){n.each(t,function(t,u){var f=n(u);f.removeAttr(r.defaultCol);f.removeClass(i.ascend);f.removeClass(i.descend)})},v=function(r){if(!n(r.target).is("a[href]")){r.stopPropagation();var u=n(this).parent(),c=r.data.col,e=s.index(u);h(u.siblings());u.hasClass(i.descend)?(f[t]("sortBy",c,!0),e+="_asc"):(f[t]("sortBy",c),e+="_desc");o&&o.find("select").val(e).trigger("refresh");r.preventDefault()}},y=function(t){n.each(t,function(t,u){var f=n(u);f.is("["+r.defaultCol+"]")&&(f.hasClass(i.descend)||f.addClass(i.ascend))})},p=function(e){o=n("<div>").addClass(i.switcher).addClass(i.tableToolbar).html(function(){var t=["<label>"+Tablesaw.i18n.sort+":"];return t.push('<span class="btn btn-small">&#160;<select>'),e.each(function(f){var e=n(this),s=e.is("["+r.defaultCol+"]"),h=e.hasClass(i.descend),o=!1;n(this.cells).slice(0,3).each(function(){if(!isNaN(parseInt(u(this),10)))return o=!0,!1});t.push("<option"+(s&&!h?" selected":"")+' value="'+f+'_asc">'+e.text()+" "+(o?"↑":"(A-Z)")+"<\/option>");t.push("<option"+(s&&h?" selected":"")+' value="'+f+'_desc">'+e.text()+" "+(o?"↓":"(Z-A)")+"<\/option>")}),t.push("<\/select><\/span><\/label>"),t.join("")});var s=f.prev(".tablesaw-bar"),c=s.children().eq(0);c.length?o.insertBefore(c):o.appendTo(s);o.find(".btn").tablesawbtn();o.find("select").on("change",function(){var i=n(this).val().split("_"),r=e.eq(i[0]);h(r.siblings());f[t]("sortBy",r.get(0),i[1]==="asc")})};c();s=f.find("thead th[data-"+t+"-col]");l(s);a(s,v);y(s);f.is(e)&&p(s,f.find("tbody tr:nth-child(-n+3)"))},getColumnNumber:function(t){return n(t).prevAll().length},getTableRows:function(){return n(this).find("tbody tr")},sortRows:function(t,i,r,f){var o,s,h,c=function(t){var r=[];return n.each(t,function(t,f){r.push({cell:u(n(f).children().get(i)),rowNum:t})}),r},l=function(n,t){var i=/[^\-\+\d\.]/g;return n?function(n,r){return t||!isNaN(parseFloat(n.cell))?parseFloat(n.cell.replace(i,""))-parseFloat(r.cell.replace(i,"")):n.cell.toLowerCase()>r.cell.toLowerCase()?1:-1}:function(n,r){return t||!isNaN(parseFloat(n.cell))?parseFloat(r.cell.replace(i,""))-parseFloat(n.cell.replace(i,"")):n.cell.toLowerCase()<r.cell.toLowerCase()?1:-1}},a=function(n,t){for(var r=[],f,i=0,u=n.length;i<u;i++)f=n[i].rowNum,r.push(t[f]);return r},e;return o=c(t),e=n(f).data("tablesaw-sort"),s=(e&&typeof e=="function"?e(r):!1)||l(r,n(f).is("[data-sortable-numeric]")),h=o.sort(s),a(h,t)},replaceTableRows:function(t){var i=n(this),r=i.find("tbody");r.html(t)},makeColDefault:function(t,u){var f=n(t);f.attr(r.defaultCol,"true");u?(f.removeClass(i.descend),f.addClass(i.ascend)):(f.removeClass(i.ascend),f.addClass(i.descend))},sortBy:function(i,r){var u=n(this),e,f;e=u[t]("getColumnNumber",i);f=u[t]("getTableRows");f=u[t]("sortRows",f,e,r,i);u[t]("replaceTableRows",f);u[t]("makeColDefault",i,r)}};n.fn[t]=function(i){var u=Array.prototype.slice.call(arguments,1),r;return i&&typeof i=="string"?(r=n.fn[t].prototype[i].apply(this[0],u),typeof r!="undefined"?r:n(this)):(n(this).data(t+"data")||(n(this).data(t+"active",!0),n.fn[t].prototype._create.call(this,i)),n(this))};n.extend(n.fn[t].prototype,o);n(document).on("tablesawcreate",function(n,i){i.$table.is(f)&&i.$table[t]()})}(jQuery),function(n,t){function r(r){function h(t){var r=t.attr(i.attr.init);return!r||n.matchMedia&&n.matchMedia(r).matches}function f(){if(!h(r)){u.hide();return}u.show();var n=e.find("li").removeClass(o);r.find("thead th").each(function(i){t(this).css("display")==="none"&&n.eq(i).addClass(o)})}var u=t('<div class="tablesaw-advance minimap">'),e=t('<ul class="tablesaw-advance-dots">').appendTo(u),o="tablesaw-advance-dots-hide",s=r.find("thead th");s.each(function(){e.append("<li><i><\/i><\/li>")});u.appendTo(r.prev(".tablesaw-bar"));f();t(n).on("resize",f);r.bind("tablesawcolumns.minimap",function(){f()}).bind("tablesawdestroy.minimap",function(){var i=t(this);i.prev(".tablesaw-bar").find(".tablesaw-advance").remove();t(n).off("resize",f);i.unbind(".minimap")})}var i={attr:{init:"data-tablesaw-minimap"}};t(document).on("tablesawcreate",function(n,t){(t.mode==="swipe"||t.mode==="columntoggle")&&t.$table.is("[ "+i.attr.init+"]")&&r(t.$table)})}(this,jQuery),function(n,t){var i={selectors:{init:"table[data-tablesaw-mode-switch]"},attributes:{excludeMode:"data-tablesaw-mode-exclude"},classes:{main:"tablesaw-modeswitch",toolbar:"tablesaw-toolbar"},modes:["stack","swipe","columntoggle"],init:function(n){var u=t(n),f=u.attr(i.attributes.excludeMode),e=u.prev(".tablesaw-bar"),s="",r=t("<div>").addClass(i.classes.main+" "+i.classes.toolbar).html(function(){var t=["<label>"+Tablesaw.i18n.columns+":"],o=u.attr("data-tablesaw-mode"),r,n,e;for(t.push('<span class="btn btn-small">&#160;<select>'),n=0,e=i.modes.length;n<e;n++)f&&f.toLowerCase()===i.modes[n]||(r=o===i.modes[n],r&&(s=i.modes[n]),t.push("<option"+(r?" selected":"")+' value="'+i.modes[n]+'">'+Tablesaw.i18n.modes[n]+"<\/option>"));return t.push("<\/select><\/span><\/label>"),t.join("")}),o=e.find(".tablesaw-advance").eq(0);o.length?r.insertBefore(o):r.appendTo(e);r.find(".btn").tablesawbtn();r.find("select").bind("change",i.onModeChange)},onModeChange:function(){var r=t(this),u=r.closest("."+i.classes.main),n=r.closest(".tablesaw-bar").nextUntil(n).eq(0),f=r.val();u.remove();n.data("table").destroy();n.attr("data-tablesaw-mode",f);n.table()}};t(n.document).on("tablesawcreate",function(n,t){t.$table.is(i.selectors.init)&&i.init(t.table)})}(this,jQuery);
//# sourceMappingURL=tablesaw.min.js.map
