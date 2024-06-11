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
      
    $(document).on 'click', '.js-code2mail', (event) => @mailcode(event)

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
          title: '等级/备注'
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

  mailcode: (event) ->
    index = $(event.target).parents('tr').attr('data-index')
    code = @datas[index].code
 
    load = layer.load()  
    layer.confirm "是否邮寄此物品？", (index) ->
      $.post "/code/mail", 
        code: code, (res) ->
        if res.code is 200
          layer.close(load)
        layer.alert res.msg 

i = new Index
i.init()