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
      
    $(document).on 'click', '.js-select', (event) => @selectcode(event)

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
    codename = $('.js-codename').val()
    layui.table.reload "code_table",
      where:
        codename: codename

  selectcode: (event) ->
    index = $(event.target).parents('tr').attr('data-index')
    mid = @datas[index].charac_no
    role_name = @datas[index].charac_name

    $.get "/role/select", 
      mid: mid
      role_name: role_name, (res) ->
        location.href = ""

i = new Index
i.init()