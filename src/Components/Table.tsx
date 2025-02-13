import * as React from 'react';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Select, Button } from 'Components';
import { getFilterData, getSelectList } from 'utils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from './Modal';

export interface DataType {
  [key: string]: string;
}

export default function Table() {
  const [data, setData] = React.useState<DataType[] | undefined>();
  const [cpData, setCpData] = React.useState<DataType[] | undefined>();
  const [selectList, setSelectList] = React.useState<DataType>({});
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [clickData, setClickData] = React.useState<DataType | undefined>({});

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://colosseum-mission.herokuapp.com/requests',
        );
        setData(data);
        setCpData(data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);
  React.useEffect(() => {
    setCpData(getFilterData(data, selectList));
  }, [selectList]);

  return (
    <>
      {!data ? (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <CircularProgress
            size={100}
            sx={{
              position: 'absolute',
              transform: 'translateX(-50%) translateY(-50%)',
              top: '38%',
              left: '43%',
            }}
          />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ position: 'relative', overflowX: 'visible' }}
          >
            <MUITable stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ alignItems: 'center' }}>
                  {/* 지역명 */}
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'SIGUN_NM')}
                      member={'SIGUN_NM'}
                      title={'지역'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'BIZPLC_NM')}
                      member={'BIZPLC_NM'}
                      title={'사업장명'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'LICENSG_DE')}
                      member={'LICENSG_DE'}
                      title={'인허가일자'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'BSN_STATE_DIV')}
                      member={'BSN_STATE_DIV'}
                      title={'영업상태구분코드'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'BSN_STATE_NM')}
                      member={'BSN_STATE_NM'}
                      title={'영업상태명'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'LOCPLC_FACLT_TELNO_DTLS')}
                      member={'LOCPLC_FACLT_TELNO_DTLS'}
                      title={'소재지 시설 전화'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'ROADNM_ZIPNO')}
                      member={'ROADNM_ZIPNO'}
                      title={'도로명 우편 번호'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'REFINE_ROADNM_ADDR')}
                      member={'REFINE_ROADNM_ADDR'}
                      title={'소재지도로명주소'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'REFINE_ZIPNO')}
                      member={'REFINE_ZIPNO'}
                      title={'소재지우편'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'GENRL_WAREHS_DONG_CNT')}
                      member={'GENRL_WAREHS_DONG_CNT'}
                      title={'일반창고동수'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'GENRL_WAREHS_AR_INFO')}
                      member={'GENRL_WAREHS_AR_INFO'}
                      title={'일반 창고 면적'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'EMPLY_CNT')}
                      member={'EMPLY_CNT'}
                      title={'종업원수'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'FACLT_EQUP_STUS')}
                      member={'FACLT_EQUP_STUS'}
                      title={'시설 장비 현황'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Select
                      options={getSelectList(data, 'COPRTN_YN_NM')}
                      member={'COPRTN_YN_NM'}
                      title={'법인여부명'}
                      selectList={selectList}
                      setSelectList={setSelectList}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cpData?.map((el, idx) => (
                  <>
                    <TableRow
                      key={idx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => {
                        setOpenModal(true);
                        setClickData(cpData[idx]);
                      }}
                    >
                      {/* 지역명 */}
                      <TableCell component="th" scope="row">
                        {el.SIGUN_NM}
                      </TableCell>
                      {/*사업장명  */}
                      <TableCell sx={{ width: 'max-content' }} align="left">
                        {el.BIZPLC_NM}
                      </TableCell>
                      {/* 인허가일자 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.LICENSG_DE}
                      </TableCell>
                      {/* 영업상태구분코드 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.BSN_STATE_DIV}
                      </TableCell>
                      {/* 영업상태명 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.BSN_STATE_NM}
                      </TableCell>
                      {/* 소재지 시설 전화 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.LOCPLC_FACLT_TELNO_DTLS}
                      </TableCell>
                      {/* 도로명 우편 번호 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.ROADNM_ZIPNO}
                      </TableCell>
                      {/* 소재지 도로명 주소*/}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.REFINE_ROADNM_ADDR}
                      </TableCell>
                      {/* 소재지 우편 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.REFINE_ZIPNO}
                      </TableCell>
                      {/* 일반 창고 동수 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.GENRL_WAREHS_DONG_CNT}
                      </TableCell>
                      {/* 일반 창고 면적 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.GENRL_WAREHS_AR_INFO}
                      </TableCell>
                      {/* 종업원수 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.EMPLY_CNT}
                      </TableCell>
                      {/* 시설 장비 현황 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.FACLT_EQUP_STUS}
                      </TableCell>
                      {/* 법인여부명 */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }} align="left">
                        {el.COPRTN_YN_NM}
                      </TableCell>
                    </TableRow>
                    <Modal
                      cpData={clickData}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  </>
                ))}
              </TableBody>
            </MUITable>
          </TableContainer>
          <Button />
        </>
      )}
    </>
  );
}
