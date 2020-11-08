//The Home page's real purpose is to have something to display to the user before they log in. None of the actual
//Network documentation should be available to anyone not logged in. The name CONTOSO.COM is just a placeholder
//that would be replaced with the name of the actual company or network the documentation was for and the warning
//message could be customized to something more specific.

import React from 'react';

const Home = () => {

    return (
        <main>
                <p className="docsname">CONTOSO.COM Network Documentation</p>
                <p className="warning"><span className="alert">WARNING:</span> The information contained within this documnentation is strictly confidential.<br></br>Any unauthorized access is forbidden.</p>
        </main>
    )
}

export default Home;