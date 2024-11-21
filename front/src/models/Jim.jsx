import React, { useState } from 'react';
import { JimWrap } from './jimStyle';

const Jim = ({pop,msg}) => {

    return (
        <JimWrap>
          {pop && (
                <div className="popup">
                    {msg}
                </div>
            )}
        </JimWrap>
    );
};

export default Jim;