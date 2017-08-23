function createEditTable(parentDiv, selector) {
    // table的column个数为：8个数据点，包含，上个月，本月，......本月+6
    var indexConfig = selector.indexconfig;
    var keys = Object.keys(indexConfig);

    // 获取8个数据点
    var tableColumnTimes = getTableTimeRange();
    var tableColumnTextArr = [];// ['7月','8月','9月',...'2月']
    for (var i = 0; i < tableColumnTimes.length; i++) {
        var tableColumnTime = tableColumnTimes[i];

        tableColumnTextArr.push((tableColumnTime.getMonth() + 1) + "月");
    }
    var len = tableColumnTextArr.length;

    // 获取指标，这是数据表的row,selectorPred已经存在
    /*
     * console.log(selector) var tableRowTextArr =
     * Object.keys(selector.indexconfig);
     */

    // TODO,创建table
    var oTable = document.createElement("table");
    $(oTable).addClass('gridtable');
    var oTrHead = document.createElement('tr');// 创建表头
    for (var i = 0; i < len + 2; i++) {
        var oThs = document.createElement('th');
        oTrHead.appendChild(oThs);
    }
    var oInput = document.createElement('input');
    $(oInput).attr('type', 'checkbox');
    $(oInput).addClass('allChoose');
    oTrHead.firstChild.appendChild(oInput);
    oTrHead.cells[1].innerHTML = '指标';
    var arrIndex = [];
    for (var i = 2; i < oTrHead.cells.length; i++) {
        arrIndex.push(oTrHead.cells[i]);
    }
    for (j = 0; j < arrIndex.length; j++) {
        arrIndex[j].innerHTML = tableColumnTextArr[j]// 表头的时间
    }
    var oTrindex = document.createElement('tr');
    for (var i = 0; i < len + 2; i++) {
        var oTd = document.createElement('td');
        oTrindex.appendChild(oTd)
    }

    $(oTrindex.cells[0]).attr('rowspan', 2);
    var oInputCheckBox = document.createElement('input');
    $(oInputCheckBox).attr({
        'type' : 'checkbox',
    });
    $(oInputCheckBox).addClass('checkbox');
    oTrindex.cells[0].appendChild(oInputCheckBox)
    var oTrInput = document.createElement('tr');
    $(oTrindex.cells[1]).attr('rowspan', 2);
    $(oTrindex.cells[1]).addClass('index');
    for (i = 0; i < len; i++) {
        var oInputTd = document.createElement('td');
        oTrInput.appendChild(oInputTd);
    }

    for (let i = 2; i < oTrindex.children.length; i++) {// 在td中添加input type
        // ="text"
        var oInputText = document.createElement('input');
        $(oInputText).attr({
            'type' : 'text',
            placehoder : '--'
        });
        oTrindex.children[i].appendChild(oInputText)// 剩下的td包含一个儿子input
    }
    var oTrPic = document.createElement('tr');
    $(oTrPic).addClass(keys[0]);
    $(oTrPic).attr("indexid", indexConfig[keys[0]].index);
    for (var i = 0; i < len; i++) {
        var oImg = document.createElement('img');
        $(oImg).attr('src', '')
        var oUl = document.createElement('ul');
        $(oUl).addClass('list')
        for (var j = 0; j < 5; j++) {
            var oPicImg = document.createElement('img');// img是放在li中的
            $(oPicImg).attr('src', './img/arrow/arrow' + (j + 1) + '.png');
            var oLi = document.createElement('li');
            oLi.appendChild(oPicImg)
            oUl.appendChild(oLi);
        }
        var oTdPic = document.createElement('td');// 包含img ul的td
        oTdPic.appendChild(oImg);
        oTdPic.appendChild(oUl);
        $(oTdPic).addClass('choose');
        oTrPic.appendChild(oTdPic);
    }

    oTable.appendChild(oTrHead);
    oTable.appendChild(oTrindex);
    oTable.appendChild(oTrPic);
    oTrindex.cells[1].innerHTML = keys[0];
    $(oTrindex.firstElementChild.firstElementChild).attr("value",
        indexConfig[keys[0]].index)
    // console.log(indexConfig[keys[0]])
    for (var i = 1; i < keys.length - 1; i++) {
        var oTindexClone = oTrindex.cloneNode(true);
        oTindexClone.cells[1].innerHTML = keys[i];
        $(oTindexClone.firstElementChild.firstElementChild).attr("value",
            indexConfig[keys[i]].index)
        var oTrPicClone = oTrPic.cloneNode(true);
        $(oTrPicClone).removeClass(keys[0]);
        $(oTrPicClone).addClass(keys[i]);
        $(oTrPicClone).attr("indexid", indexConfig[keys[i]].index);
        oTable.appendChild(oTindexClone);
        oTable.appendChild(oTrPicClone);
    }
    var oDivTable = document.getElementsByClassName(parentDiv)[0];
    oDivTable.appendChild(oTable);
}
createEditTable()