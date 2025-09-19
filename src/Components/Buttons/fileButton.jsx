import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledButton = styled(Button)({
    backgroundColor: 'transparent',
    color: 'rgb(22,36,71)',
    border: '1px solid',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: 'rgba(22,36,71,0.2)', // biroz quyuqroq rang
    },
});

const InputFileUpload = ({errorMassage , onChange}) => {
    return (
        <StyledButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="w-full border border-transparent dark:border-white dark:text-white dark:bg-transparent"
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                    onChange(event.target.files)
                    console.log(event.target.files)
                }}
                multiple
            />
        </StyledButton>

    );
};

export default InputFileUpload;
