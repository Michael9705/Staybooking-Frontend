// const domain = "http://localhost:8080";
const domain = "https://staybooking-362504.ue.r.appspot.com";


// 预期的结构 credentials = { username: string, password: string }
// asHost: boolean
/**
 * 
 * @param {*} credentials test
 * @param {*} asHost test1
 */
export const login = (credentials, asHost) => {
    const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;
    return fetch(loginUrl, { // 返回的值的类型是 Promise
        method: "POST", // http verb
        headers: {
            "Content-Type": "application/json", // 这个不用默认值，要后端吧发过来的信息当成 JSON 来处理
        },
        body: JSON.stringify(credentials),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to login") // Erorr class, debug的额时候可以看到 调用栈
        }

        return response.json();
    })
};

export const register = (credential, asHost) => { // register  和 login 几乎一样
    const registerUrl = `${domain}/register/${asHost ? "host" : "guest"}`;
    return fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to register");
      }
    });
};


export const getReservations = () => { // 只有 guest 会用到这个 API
    const authToken = localStorage.getItem("authToken"); // 拿取 并 储存 token
    const listReservationsUrl = `${domain}/reservations`; // 组装 URL
   
    return fetch(listReservationsUrl, { // URL 传过来
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get reservation list");
      }
   
      return response.json();
    });
};


export const getStaysByHost = () => { // 只有 host 会用这个 API
    const authToken = localStorage.getItem("authToken"); // 从 local storage 里面拿 token
    const listStaysUrl = `${domain}/stays/`; // 组装 URL
   
    return fetch(listStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get stay list");
      }
   
      return response.json();
    });
};


export const searchStays = (query) => {
    const authToken = localStorage.getItem("authToken");
    const searchStaysUrl = new URL(`${domain}/search/`);
    searchStaysUrl.searchParams.append("guest_number", query.guest_number);
    searchStaysUrl.searchParams.append(
      "checkin_date",
      query.checkin_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append(
      "checkout_date",
      query.checkout_date.format("YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append("lat", 37);
    searchStaysUrl.searchParams.append("lon", -122);
   
    return fetch(searchStaysUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to search stays");
      }
   
      return response.json();
    });
};

export const deleteStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteStayUrl = `${domain}/stays/${stayId}`;
   
    return fetch(deleteStayUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to delete stay");
      }
    });
};
   
export const bookStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const bookStayUrl = `${domain}/reservations`;
   
    return fetch(bookStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to book reservation");
      }
    });
};
   
export const cancelReservation = (reservationId) => {
    const authToken = localStorage.getItem("authToken");
    const cancelReservationUrl = `${domain}/reservations/${reservationId}`;
   
    return fetch(cancelReservationUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to cancel reservation");
      }
    });
};
   
export const getReservationsByStay = (stayId) => {
    const authToken = localStorage.getItem("authToken");
    const getReservationByStayUrl = `${domain}/stays/reservations/${stayId}`;
   
    return fetch(getReservationByStayUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get reservations by stay");
      }
   
      return response.json();
    });
};
   
export const uploadStay = (data) => {
    const authToken = localStorage.getItem("authToken");
    const uploadStayUrl = `${domain}/stays`;
   
    return fetch(uploadStayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to upload stay");
      }
    });
};

