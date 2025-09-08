import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage() {
    return (
        <Stack sx={{ width: '100%' }} >
            <Alert severity="success" sx={{
                background  : '#00ff06',
                color: '#fff',
            }}  >This is a success Alert.</Alert>
            {/*<Alert severity="info">This is an info Alert.</Alert>*/}
            {/*<Alert severity="warning">This is a warning Alert.</Alert>*/}
            {/*<Alert severity="error">This is an error Alert.</Alert>*/}
        </Stack>
    );
}