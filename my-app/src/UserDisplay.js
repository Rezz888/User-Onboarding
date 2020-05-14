import React from "react";

const UserDisplay = props => {
    const { user } = props;

    return(
        <div className="users">
          <pre>{user.length > 0 ? <code>{JSON.stringify(user, null, 2)}</code> : null}</pre>  
        </div>
        
    );
    
}

export default UserDisplay;