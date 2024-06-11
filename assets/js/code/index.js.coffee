#= require ../common/index

class Index extends Common
  constructor: () ->
    super()
    @table = layui.table
    @datas = []
  init: () ->
    super()
    @tableRender()

    $(document).on 'click', '.js-search-btn', @search
      
    $(document).on 'click', '.js-show', -> layer.msg "功能开发中"

  tableRender: () ->
    @table.render
      elem: '#code_table'
      url: '/code/list'
      page: true
      cols: [[
        {
          field: 'code'
          title: '物品代码',
        },
        {
          field: 'codename'
          title: '物品名称'
        },
        {
          field: 'grade'
          title: '等级'
        },
        {
          title: '操作',
          toolbar: '#toolbar'
        },
      ]]
      done: (res) =>
        @datas = res.data
        
  search: () ->
    code = $('.js-code').val()
    layui.table.reload "code_table",
      where:
        code: code 

i = new Index
i.init()