import React, { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import Result from './Result';
import { debounce } from '../../../util'
import { ICase } from '../../../pages/TestCase/TestCase';
import styles from './styles.scss';
import axios from '../../../api/ajax';

const SearchCase: React.FC = function() {
  const [searchInfo, setSearchInfo] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ICase[]>([]);
  const [result, setResult] = useState<boolean>(false);
  const debouncedSearch = useCallback(debounce(() => { search() }, 500), [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInfo(e.target.value);
    debouncedSearch();
  }
  const search = () => {
    axios.post('/case/search', { search: searchInfo }).then((res) => {
      setSearchResult(res.data);
    })
  }
  useEffect(() => {
    document.addEventListener('click', (e: MouseEvent) => {
      const node = document.getElementById('input');
      if (node === e.target) {
        setResult(true);
      } else {
        setResult(false);
      }
    })
  }, [])

  return (
    <div>
      <Input id='input' placeholder='Search Testcase' value={searchInfo} onChange={handleChange} className={styles.search} allowClear/>
      { (result && searchInfo.length) ? <Result data={searchResult} /> : null}
    </div>
  );
}

export default SearchCase;
