/************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Data.js  <<<

Contains helper methods that interacts with the api by sending requests.
************************************************************************/

export default class Data {

    /**
    * This method handles an API request.
    * @params
    *   {String} path - route path of request.
    *   {String} method - type of request.
    *   {Object} body - body of request.
    *   {Boolean} requiresAuth - true if request requires authentication.
    *   {Object} credentials - user email address and password (if required)
    * @returns {Promise} response recieved from server.
    */
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

    /**
    * This method retrieves a user's details from the database.
    * @params
    *   {String} emailAddress - email address of the user.
    *   {String} password - password of the user.
    * @returns {Object} user details in JSON format or null.
    */
    async getUser(emailAddress, password) {
        const res = await this.api(`/users`, 'GET', null, true, {emailAddress,password} );
        if (res.status === 200)  // user has been successfully retrieved.
          return res.json().then( (data) => data);
        else if (res.status === 401) // request couldn't be authenticated.
          return null;
        else {
            const error = new Error();
            error.name = (res.status === 404) ? 'notFound' : 'unhandled';
            throw error;
        }
    }

    /**
    * This method creates a new user and adds it to the database.
    * @params
    *   {Object} user - contains user details.
    * @returns {Array} array of errors or null if request failed or succeeded, respectfully.
    */
    async createUser(user) {
        const res = await this.api('/users', 'POST', user);
        if (res.status === 201) // user has been successfully created.
            return [];
        else if (res.status === 400) {   // request failed
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

    /**
    * This method retrieves a list of courses from the database.
    * @returns {Object} courses list in JSON format.
    */
    async getCourses() {
        const res = await this.api('/courses','GET');
        if (res.status === 200) // courses list has been successfully retrieved.
          return res.json().then( (data) => data);
        else {
          const error = new Error();
          error.name = (res.status === 404) ? 'notFound' : 'unhandled';
          throw error;
        }
    }

    /**
    * This method retrieves a course's details from the database.
    * @params
    *   {Integer} courseID - the id of the course.
    * @returns {Object} a course's details in JSON format.
    */
    async getCourse(courseID) {
      const res = await this.api(`/courses/${courseID}`,'GET');
      if (res.status === 200)  // course's details have been successfully retrieved.
        return res.json().then( (data) => data);
      else {
        const error = new Error();
        error.name = (res.status === 404) ? 'notFound' : 'unhandled';
        throw error;
      }

    }

    /**
    * This method deletes a course from the database.
    * @params
    *   {Integer} courseID - the id of the course.
    *   {String} emailAddress - email address of the user.
    *   {String} password - password of the user.
    * @returns {Array} array of errors or null if request failed or succeeded, respectfully.
    */
    async deleteCourse(courseID, emailAddress, password) {
      const res = await this.api(`/courses/${courseID}`, 'DELETE',null, true, {emailAddress,password});
      if (res.status === 204) // course has been successfully deleted.
          return [];
      else if (res.status === 401) // request couldn't be authenticated.
          return null;
      else {
          const error = new Error();
          error.name = (res.status === 404) ? 'notFound' : 'unhandled';
          throw error;
      }
    }

    /**
    * This method updates a course in the database.
    * @params
    *   {Integer} courseID - the id of the course.
    *   {Object} body - request body in JSON format.
    *   {String} emailAddress - email address of the user.
    *   {String} password - password of the user.
    * @returns {Array} array of errors or null if request failed or succeeded, respectfully.
    */
    async updateCourse(courseID, body, emailAddress, password) {
      const res = await this.api(`/courses/${courseID}`, 'PUT', body, true, {emailAddress,password});
      if (res.status === 204) // course has been successfully updated.
          return [];
      else if (res.status === 400) {  // request failed.
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

    /**
    * This method creates a course and adds it to the database.
    * @params
    *   {Object} body - request body in JSON format.
    *   {String} emailAddress - email address of the user.
    *   {String} password - password of the user.
    * @returns {Array} array of errors or null if request failed or succeeded, respectfully.
    */
    async createCourse(body, emailAddress, password) {
      const res = await this.api('/courses', 'POST', body, true, {emailAddress,password});
      if (res.status === 201) // course has been successfully created.
          return [];
      else if (res.status === 400) {  // request failed.
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
