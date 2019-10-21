export default class Data {


    api(path, method='GET',body = null, requiresAuth = false, credentials = null) {
        const url = 'http://localhost:5000/api' + path;

        const options = {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

        if (body !== null)
            options.body = JSON.stringify(body);

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url,options);
    }

    async getUser(emailAddress, password) {
        const res = await this.api(`/users`, 'GET', null, true, {emailAddress,password} );
        if (res.status === 200)
          return res.json().then( (data) => data);
        else if (res.status === 401)
          return null;
        else {
            const error = new Error();
            error.name = (res.status === 404) ? 'notFound' : 'unhandled';
            throw error;
        }
    }

    async createUser(user) {
        const res = await this.api('/users', 'POST', user);
        if (res.status === 201)
            return [];
        else if (res.status === 400) {
            return res.json().then( (data) => {
                return data.errors;
            });
        }
        else {
            const error = new Error();
            error.name = (res.status === 404) ? 'notFound' : 'unhandled';
            throw error;
        }
    }


    async getCourses() {
        const res = await this.api('/courses','GET');
        if (res.status === 200)
          return res.json().then( (data) => data);
        else {
          const error = new Error();
          error.name = (res.status === 404) ? 'notFound' : 'unhandled';
          throw error;
        }
    }

    async getCourse(courseID) {
      const res = await this.api(`/courses/${courseID}`,'GET');
      if (res.status === 200)
        return res.json().then( (data) => data);
      else {
        const error = new Error();
        error.name = (res.status === 404) ? 'notFound' : 'unhandled';
        throw error;
      }

    }


    async deleteCourse(courseID, emailAddress, password) {
      const res = await this.api(`/courses/${courseID}`, 'DELETE',null, true, {emailAddress,password});
      if (res.status === 204)
          return [];
      else if (res.status === 401)
          return null;
      else {
          const error = new Error();
          error.name = (res.status === 404) ? 'notFound' : 'unhandled';
          throw error;
      }
    }

    async updateCourse(courseID, body, emailAddress, password) {
      const res = await this.api(`/courses/${courseID}`, 'PUT', body, true, {emailAddress,password});
      if (res.status === 204){
        return [];
      }


      else if (res.status === 400) {
          return res.json().then( (data) => {
              return data.validationErrors;
          });
      }
      else {
        const error = new Error();
        error.name = (res.status === 404) ? 'notFound' : 'unhandled';
        throw error;
      }
    }


    async createCourse(body, emailAddress, password) {
      const res = await this.api('/courses', 'POST', body, true, {emailAddress,password});
      if (res.status === 201)
          return [];
      else if (res.status === 400) {
          return res.json().then( (data) => {
              return data.errors;
          });
      }
      else {
        const error = new Error();
        error.name = (res.status === 404) ? 'notFound' : 'unhandled';
        throw error;
      }
    }
}
