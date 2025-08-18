
   class RequestForms {
    musinsaDailySettlement = async (startDate, endDate, status) => {
        let formData = new FormData();
        formData.append('USR_SEARCH_ITEM_CNT', '2');
        formData.append('PAGE_CNT', '10');
        formData.append('LIMIT', '1000');
        formData.append('PAGE', '1');
        formData.append('MENU_ID', '/po/order-group-admin/account/acc65');
        formData.append('S_COM_ID', 'divein');

        if(status === 'confirmed') {
        formData.append('S_ORD_STATE', '50');
        formData.append('DISPLAY_SETTLEMENT_STATUS', '정산');

        } else if (status === 'toBeConfirmed') {
        formData.append('S_ORD_STATE', '10');
        formData.append('DISPLAY_SETTLEMENT_STATUS', '정산예정');
        } else {
            throw new Error('status는 "confirmed" 또는 "toBeConfirmed" 중 하나여야 합니다.');
        }

        formData.append('DATE_TYPE', '0');
        formData.append('S_SDATE', startDate); //string 2025-08-12
        formData.append('S_EDATE', endDate);
        formData.append('LIMIT', '10000');
        return formData;
    }
    musinsaStockManage = async () => {
        let formData = new FormData();
        formData.append('MENU_ID', '/po/jaego/jae40');
        formData.append('USR_SEARCH_ITEM_CNT', '0');
        formData.append('PAGE_CNT', '10');
        formData.append('LIMIT', '100');
        formData.append('PAGE', '1');
        formData.append('SORT', 'desc');
        formData.append('ORD_FIELD', 'goods_no');
        formData.append('LIMIT', '2000');
        return formData;
    }
    musinsaStockHistory = async (startDate,endDate) => {
        let formData = new FormData();
        formData.append('MENU_ID', '/po/jaego/jae05');
        formData.append('USR_SEARCH_ITEM_CNT', '0');
        formData.append('PAGE_CNT', '10');
        formData.append('LIMIT', '100');
        formData.append('PAGE', '1');
        formData.append('S_SDATE', startDate);
        formData.append('S_EDATE', endDate);
        formData.append('LIMIT', '10000');
        return formData;
    }
    musinsaGoodsList = async () => {
        let formData = new FormData();
        formData.append('MENU_ID', '/po/prd/prd01');
        formData.append('USR_SEARCH_ITEM_CNT', '9');
        formData.append('PAGE_CNT', '10');
        formData.append('LIMIT', '100');
        formData.append('PAGE', '1');
        formData.append('SORT', 'desc');
        formData.append('ORD_FIELD', 'goods_no');
        formData.append('S_SALE_STATUS_CHECKBOX_ALL', 'ALL');
        formData.append('NOT_D_CAT_CD', 'N');
        formData.append('S_CAT_TYPE', 'BASE');
        formData.append('LIMIT', '10000');
        formData.append('IS_IMG_SHOW', 'N');
        return formData;
    }
    musinsaReviewList = async (startDate, endDate) => {
        let formData = new FormData();
        formData.append('MENU_ID', '/po/csm/csm07');
        formData.append('USR_SEARCH_ITEM_CNT', '0');
        formData.append('PAGE_CNT', '10');
        formData.append('LIMIT', '1000');
        formData.append('PAGE', '1');
        formData.append('DATE_TYPE', '0');
        formData.append('S_SDATE', startDate);
        formData.append('S_EDATE', endDate);
        formData.append('ORD_FIELD', 'a.regi_date');
        formData.append('ORD', 'desc');
        return formData;
    }
    musinsaGlobalOrderHistory = async (startDate, endDate) => {
        const limit = 10000
        const formData = `MENU_ID=%2Fpo%2Fglobal-order-admin%2Forder%2Forder%2Flist&USR_SEARCH_ITEM_CNT=0&LIMIT=${limit}&PAGE=1&PAGE_CNT=10&FORCE_SEARCH=N&DATE_TYPE=0&S_SDATE=${startDate}&S_EDATE=${endDate}&M_NUD=&S_ORD_NO=&S_ORD_NOS=&S_ORD_OPT_NO=&S_ORD_OPT_NOS=&S_USER_NM=&S_USER_EMAIL=&S_STYLE_NO=&S_STYLE_NOS=&S_GOODS_NO=&S_GOODS_NOS=&S_BRAND_NM=&S_BRAND_CD=&S_GOODS_NM=&S_ORD_STATE=&S_CENTER_TYPE=&S_CENTER_NO=&S_LOGISTICS_BUSINESS_TYPES=M1P&S_BUYOUT=&S_CLM_STATE=&S_LOGISTICS_BUSINESS_TYPES=partner,MFS,MWP,M1P`
        return formData;
    }
}

   module.exports = RequestForms;