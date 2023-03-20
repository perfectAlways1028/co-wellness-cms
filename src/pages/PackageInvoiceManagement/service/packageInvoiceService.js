import { observable, action, decorate, computed } from 'mobx';
import axios from '@helpers/axios';
import config from '@config';

export function findPackageInvoiceService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/packageInvoice/find`,
        data: data,
    });
}
export function findOnePackageInvoiceService(id) {
    return axios.Get({
        url: `${config.baseUrl}/admin/v1/packageInvoice/${id}`
    });
}

export function createPackageInvoiceService(data) {
    return axios.Post({
        url: `${config.baseUrl}/admin/v1/packageInvoice`,
        data: data,
    }); 
}