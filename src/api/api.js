import fetch from './fetch.js'
import apiUrls from './apiUrls'

const staffList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.staffList,
    method: 'get',
    params: params
  })
}

const deleteStaff = params =>{
  return fetch({
    url: `${apiUrls.getUserIdPrefix()}${apiUrls.deleteStaff}/${params}`,
    method: 'delete',
    params: ''
  })
}



const productNameList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.productNameList,
    method: 'get',
    params: ''
  })
}

const productProcessesList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.productProcessesList,
    method: 'get',
    params: params
  })
}

const staffNameList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.staffNameList,
    method: 'get',
    params: ''
  })
}

const recordList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.recordList,
    method: 'get',
    params: params
  })
} 

const deleteRecord = params =>{
  return fetch({
    url: `${apiUrls.getUserIdPrefix()}${apiUrls.deleteRecord}/${params}`,
    method: 'delete',
    params: ''
  })
} 


const productList = params =>{
  return fetch({
    url: apiUrls.getUserIdPrefix()+apiUrls.productList,
    method: 'get',
    params: params
  })
} 

const deleteProduct = params =>{
  return fetch({
    url: `${apiUrls.getUserIdPrefix()}${apiUrls.deleteProduct}/${params}`,
    method: 'delete',
    params: ''
  })
}



const apiList = {
  staffList,
  deleteStaff,
  productNameList,
  productProcessesList,
  staffNameList,
  recordList,
  deleteRecord,
  deleteProduct,
  productList,

}

export default apiList
