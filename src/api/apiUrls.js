
import { SERVER_BASE_URL } from './config'




const apiUrls = {
	getUserIdPrefix:()=>{
		let userId;
		if(localStorage.getItem("userInfo")){
		 	userId = JSON.parse(localStorage.getItem("userInfo")).id
		}
		return `/${userId}`;
	},
	baseUrl: SERVER_BASE_URL,

	login: `/auth/accredit`,
	logout: `/auth/logout`,
	verify: `/auth/verify`,
	verifyActive: `/auth/verifyActive`,
	updateProfile: `/user/updateProfile`,
	staffList: `/staff/staffList`,
	updateStaff: `/staff/updateStaff/`,
	deleteStaff: `/staff/deleteStaff/`,
	insertStaff: `/staff/insertStaff`,
	productProcessesList: `/product/productProcessesList`,
	productNameList: `/product/productNameList`,
	staffNameList: `/staff/staffNameList`,
	recordList: `/record/recordList`,
	insertRecords: `/record/insertRecords`,
	updateRecord: `/record/updateRecord/`,
	deleteRecord: `/record/deleteRecord/`,
	insertProduct: `/product/insertProduct`,
	updateProduct: `/product/updateProduct/`,
	deleteProduct: `/product/deleteProduct/`,
	productList: `/product/productList`,
	salaryRecord: `/record/salaryRecord`,

}

export default apiUrls
