import { Box } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'; 

export interface ReceiptProps {
  dt: Date;
  tenant: {
    id: number;
    name: string;
    accNum: string;
    square: Number;
    tarif: Number;
    dept: Number;
    accrued: Number;
    paid: Number;
    total: Number;
  }
}

const amountView = (amount: Number): string => {
  return amount.toFixed(2).replace('.', ',');
}

export default (props: ReceiptProps) => {
  // dayjs.extend(localizedFormat);
  // dayjs.locale('ru');

  return (
    <Box sx={{backgroundColor: "#fff"}}>
      <div style={{pageBreakInside: 'avoid', width: '100%'}}>
        <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          width: '100%',
          fontSize: '13px',
        }}>
          <span>Квитанция на оплату взносов на содержание дома за </span>
          <span style={{textTransform: 'lowercase'}}>{dayjs(props.dt).locale('ru').format('MMMM YYYY')} г.</span>
        </div>
        <div style={{width: '100%', paddingTop: '4px'}}>
          <table style={{
            borderTop: '1px solid #666',
            width: '100%',
            fontSize: '11px',
            fontWeight: 500,
          }}>
            <tbody>
              <tr>
                <td style={{width: '70%'}}>
                  <p style={{height: '8px'}}>
                    <span>Адрес: </span>
                    <span style={{ fontWeight: 'bold' }}>ул. Героев Сталинграда 3, кв. {props.tenant.accNum}</span>
                  </p>
                  <p style={{height: '8px'}}>
                    <span>Собственник: </span>
                    <span style={{ fontWeight: 'bold' }}>{props.tenant.name}</span>
                  </p>
                </td>
                <td style={{width: '30%'}}>
                  <p style={{height: '8px'}}>
                    <span>Лицевой счет: </span>
                    <span style={{ fontWeight: 'bold' }}>{props.tenant.accNum}</span>
                  </p>
                  <p style={{height: '8px'}}>
                    <span>Общая площадь: </span>
                    <span style={{ fontWeight: 'bold' }}>{props.tenant.square.toFixed(1).replace('.', ',')} м кв.</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="contentTableChargesReceipt">
            <table id="table-charges-receipt-0" className="table tableBordered" style={{ marginBottom: '-6px' }}>
              <thead>
                <tr className="borderedBlack">
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Услуга </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Тариф </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Долг/Переплата на  {dayjs(props.dt).format('01.MM.YYYY')}г. </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Начислено </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Субсидия/ Льгота </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Оплачено </th>
                  <th align="center"
                    style={{
                      verticalAlign: 'middle',
                      padding: '2px',
                      fontSize: '10px',
                      border: '1px solid #0c0c0c',
                    }}>
                    К оплате, руб. </th>
                </tr>
              </thead>
              <tbody>
                <tr className="borderedBlack">
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    fontWeight: '400',
                    border: '1px solid #0c0c0c',
                    width: '36%',
                  }} align="left">Взносы на содержание дома и придомовой территории</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">{amountView(props.tenant.tarif)}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '14%',
                  }} align="right">{amountView(props.tenant.dept)}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">{amountView(props.tenant.accrued)}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">{amountView(0)}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">{amountView(props.tenant.paid)}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">{amountView(props.tenant.total)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="borderedBlack">
                  <td colSpan={6}
                    align="left"
                    style={{
                      fontWeight: 'bold',
                      padding: '2px',
                      fontSize: '11px',
                      border: '1px solid #0c0c0c',
                    }}>
                    Итого к оплате </td>
                  <td align="right"
                    style={{
                      fontWeight: 'bold',
                      padding: '2px 4px 2px 2px',
                      fontSize: '11px',
                      border: '1px solid #0c0c0c',
                    }}>{amountView(props.tenant.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <table style={{
            width: '100%',
            fontSize: '11px',
            fontWeight: 500,
          }}>
            <tbody>
              <tr>
                <td>
                  <p style={{height: '8px'}}>
                    <span>Реквизиты для оплаты: </span>
                    <span style={{ fontWeight: 'bold' }}>ТСЖ “РОСИНКА”  ИНН 9001032516  КПП 900101001</span>
                  </p>
                  <p style={{height: '8px'}}>
                    <span>Банк получателя: </span>
                    <span style={{ fontWeight: 'bold' }}>ЮГО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК БИК 046015602</span>
                  </p>
                  <p style={{height: '8px'}}>
                    <span>Расчетный счет: </span>
                    <span style={{ fontWeight: 'bold' }}>Р/С 40703810452720000076</span>
                  </p>
                  <p style={{height: '8px'}}>
                    <span>Назначение платежа: </span>
                    <span style={{ fontWeight: 'bold' }}>л/с {props.tenant.accNum} {props.tenant.name}. взносы на содержание дома</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="scissors"
            style={{
              borderBottom: '1px dashed #000',
              textAlign: 'left',
              padding: '2px 0 2px',
            }}>
          </div>
        </div>
      </div>
    </Box>
  );
}
