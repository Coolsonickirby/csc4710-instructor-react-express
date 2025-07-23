import React, {useEffect, useState} from 'react'    // Imports the React library
import { Outlet } from 'react-router-dom';

function Test(){
    return (
        <Outlet>
            <div>
                <h1>HIHIHI</h1>
            </div>
        </Outlet>
    )
}

export default Test;