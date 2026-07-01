import test from '@playwright/test'
import {loginAdminAndSaveToken} from '../../Api/adminLogin'
import {getStocklistSettings, getSalesOrderSettings, getAccountSettings} from '../../Api/adminApi'


test.skip(`Admin login api`, async({page})=>{
    await loginAdminAndSaveToken()
    await getStocklistSettings()

})

test.skip(`Read sales order settings`, async({page})=>{
    await loginAdminAndSaveToken()
    await getSalesOrderSettings()


})
 test.skip(`Read account settings`, async({page})=>{
    await loginAdminAndSaveToken()
    await getAccountSettings()

 })


