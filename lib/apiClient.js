import $ from 'jquery'
import Promise from 'bluebird'

var baseUrl = '/api'

require('jquery.cookie')

function parseResponse (jqResult, url) {
  return Promise.resolve(jqResult).then(function (result) {
    const originError = result.code

    if (originError === 0) {
      return result.data
    }

    let error = new Error(originError.message)
    error.code = originError.code

    throw error
  }, function (error) {
    // var status = error.status

    error = new Error('网络异常')
    error.code = 0
    throw error
  })
}

export default {

  post (url, data) {
    return parseResponse($.ajax(baseUrl + url, {
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      type: 'POST',
      data: data,
      timeout: 1000 * 30
    }), url)
  },

  get (url, data) {
    return parseResponse($.ajax(baseUrl + url, {
      dataType: 'json',
      data: data,
      timeout: 1000 * 30
    }), url)
  }

}
