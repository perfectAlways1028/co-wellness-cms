import { findBroadcastService, createBroadcastService, updateBroadcastService, findOneBroadcastService} from '../service/broadcastService'; 

import { observable, action, decorate, computed } from 'mobx';

class BroadcastStore {
//observables

isLoadingImage=false;
successImage=false;
errorImage=null;

isLoading=false;
success=false;
error=null;

broadcasts=[];

detailBroadcast = null;

currentAction=null;
totalCount=0;
limit=10;

findOneBroadcast(id) {
 this.isLoading = true;
 this.error = undefined;
 return findOneBroadcastService(id)
   .then(action(response => {
       if(response && response.data) {
         this.detailBroadcast = response.data;
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

findBroadcasts(filter) {
   this.isLoading = true;
   this.error = undefined;
   return findBroadcastService(filter)
     .then(action(response => {
       console.log("response",response);
         if(response && response.data) {
           this.broadcasts = response.data.data;
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

createBroadcast(body) { 
 this.isLoading = true;
 this.error = undefined;
 return createBroadcastService(body)
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

updateBroadcast(id, body) {
 this.isLoading = true;
 this.error = undefined;
 return updateBroadcastService(id, body)
   .then(action(response => {
     console.log("response",response);
       this.success = true;
   
   }))
   .catch(action((err) => {
    console.log("err", err)
     this.error = err.message;
     this.success = false;
     throw err;
   }))
   .finally(action(() => { this.isLoading = false; }));
}
}

decorate(BroadcastStore, {
 isLoading: observable,
 success: observable,
 error: observable,
 currentAction: observable,
 totalCount: observable,
 broadcasts: observable,
 detailBroadcast: observable,

 findBroadcasts: action,
 findOneBroadcast: action,
 createBroadcast: action,
 updateBroadcast: action,
});

export default new BroadcastStore();