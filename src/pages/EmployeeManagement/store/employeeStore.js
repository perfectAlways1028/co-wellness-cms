import {
  findEmployeeService, bulkCreateEmployeeService, createEmployeeService, updateEmployeeService,
  deleteEmployeeService, findOneEmployeeService, uploadImageService
} from '../service/employeeService';
import { observable, action, decorate, computed } from 'mobx';
class EmployeeStore {
  //observables
  isLoading = false;
  success = false;
  error = null;

  employees = [];

  detailEmployee = null;

  currentAction = null;
  totalCount = 0;
  limit = 10;

  editedData = {
    progress: 0
  }

  setEditedData = newData => {
    this.editedData = {
      ...this.editedData,
      ...newData,
    }
  }

  findOneEmployee(id) {
    this.isLoading = true;
    this.error = undefined;
    return findOneEmployeeService(id)
      .then(action(response => {
        if (response && response.data) {
          this.detailEmployee = response.data;
          this.success = true;
          return response.data;
        } else {
          this.success = false;
          this.error = 'No data.';
        }

      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  findEmployees(filter) {
    this.isLoading = true;
    this.error = undefined;
    return findEmployeeService(filter)
      .then(action(response => {
        if (response && response.data) {
          this.employees = response.data.data;
          this.totalCount = response.data.count;
          this.success = true;
        } else {
          this.success = false;
          this.error = 'No data.';
        }
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  createEmployee(body) {
    this.isLoading = true;
    this.error = undefined;
    return createEmployeeService(body)
      .then(action(response => {
        this.success = true;
        return response.data;
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;

        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  bulkCreateEmployee(body) {
    this.isLoading = true;
    this.error = undefined;
    return bulkCreateEmployeeService({
      data: body,
      onUploadProgress:
        progressEvent => {
          this.setEditedData({ progress: Math.round((100 * progressEvent.loaded) / progressEvent.total) })
        }
    })
      .then(action(response => {
        this.success = true;
        return response.data;
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;

        throw err;
      }))
      .finally(action(() => {
        if (this.editedData.progress === 100) {
          setTimeout(
            () => {
              this.isLoading = false;
            }, 2000
          )
        }
      }));
  }

  updateEmployee(id, body) {
    this.isLoading = true;
    this.error = undefined;
    return updateEmployeeService(id, body)
      .then(action(response => {
        this.success = true;

      }))
      .catch(action((err) => {
        this.error = err.message;
        this.success = false;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }
  deleteEmployee(id) {
    this.isLoading = true;
    this.error = undefined;
    return deleteEmployeeService(id)
      .then(action(response => {
        this.success = true;
      }))
      .catch(action((err) => {
        this.success = false;
        this.error = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }
  uploadImage(path, type) {
    this.isLoadingImage = true;
    this.errorImage = undefined;
    return uploadImageService(path, type)
      .then(action(response => {
        this.successImage = true;
        return response.data;
      }))
      .catch(action((err) => {
        this.successImage = false;
        this.errorImage = err.message;
        throw err;
      }))
      .finally(action(() => { this.isLoadingImage = false; }));
  }


}

decorate(EmployeeStore, {
  isLoadingImage: observable,
  successImage: observable,
  errorImage: observable,
  editedData: observable,

  isLoading: observable,
  success: observable,
  error: observable,
  currentAction: observable,
  totalCount: observable,
  employees: observable,
  detailEmployee: observable,

  findEmployees: action,
  findOneEmployee: action,
  createEmployee: action,
  updateEmployee: action,
  deleteEmployee: action,
  bulkCreateEmployee: action,
  setEditedData: action

});

export default new EmployeeStore();