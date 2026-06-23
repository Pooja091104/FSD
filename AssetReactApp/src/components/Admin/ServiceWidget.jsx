import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ServiceWidget = () => {
  const [requests, setRequests] = useState([]);


 

  return (
 

     <div className="row">
      {/* HEADER CARD */}
        <div className="col-12 mb-4">
          <h4 className="mb-0">🛠 Service Requests</h4>

          {/* FILTER */}
         
        </div>
      </div>
    

  );
};

export default ServiceWidget;