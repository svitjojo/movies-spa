import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from '@mui/material';
import * as React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { importTxt, list } from '../movies.slice';

export default function MovieImport() {
  const dispatch = useAppDispatch();

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await dispatch(importTxt(file)).unwrap();

      dispatch(list({}));
    } finally {
      e.target.value = '';
    }
  };

  return (
    <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
      Import movies
      <input hidden type="file" accept=".txt" onChange={onPick} />
    </Button>
  );
}
