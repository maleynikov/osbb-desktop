import { Box } from "@mui/material";
import React from 'react';

interface ReceiptData {
    name: string;
    accountNum: number;
    appNum: number;
    square: number;
    tarif: number;
}

  // calc some fields like
  // sum to pay
  // dept
  // benefit
  // etc

export const ReceiptOrigin = React.forwardRef<HTMLDivElement, { data: ReceiptData }>(
  ({ data }, ref) => (
    <Box ref={ref} sx={{
      padding: 2,
      backgroundColor: "#fff",
    }}>
      <div style={{
        pageBreakInside: 'avoid',
        width: '100%',
      }}>
        <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          width: '100%',
          fontSize: '13px',
        }}>
          <span>Квитанция на оплату взносов на содержание дома за </span>
          <span style={{
            textTransform: 'lowercase',
          }}>май 2025 г.</span>
        </div>
        <div style={{
          width: '100%',
          paddingTop: '4px',
        }}>
          <table style={{
            borderTop: '1px solid #666',
            width: '100%',
            fontSize: '11px',
            fontWeight: 500,
          }}>
            <tbody>
              <tr>
                <td>
                  <p>
                    <span>Адрес: </span>
                    <span style={{ fontWeight: 'bold' }}>ул. Героев Сталинграда 3, кв. {data.appNum}</span>
                  </p>
                  <p>
                    <span>Собственник: </span>
                    <span style={{ fontWeight: 'bold' }}>{data.name}</span>
                  </p>
                </td>
                <td>
                  <p>
                    <span>Лицевой счет: </span>
                    <span style={{ fontWeight: 'bold' }}>{data.accountNum}</span>
                  </p>
                  <p>
                    <span>Общая площадь: </span>
                    <span style={{ fontWeight: 'bold' }}>{data.square.toFixed(1).replace('.', ',')} м кв.</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="contentTableChargesReceipt">
            <table id="table-charges-receipt-0"
              className="table tableBordered" style={{ marginBottom: '5px' }}>
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
                    Долг/Переплата на  01.05.2025г. </th>
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
                  }} align="right">{data.tarif.toFixed(2).replace('.', ',')}</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '14%',
                  }} align="right">3&nbsp;468,92</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">433,44</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">0,00</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">0,00</td>
                  <td style={{
                    verticalAlign: 'middle',
                    padding: '2px 4px 2px 2px',
                    color: '#0c0c0c',
                    fontSize: '10px',
                    border: '1px solid #0c0c0c',
                    width: '10%',
                  }} align="right">3&nbsp;902,36</td>
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
                    }}>
                    3&nbsp;902,36 </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <table style={{
            width: '100%',
            fontSize: '11px',
            fontWeight: 500
          }}>
            <tbody>
              <tr>
                <td>
                  <p>
                    <span>Реквизиты для оплаты: </span>
                    <span style={{ fontWeight: 'bold' }}>ТСЖ "Росинка"  ИНН 9001032516  КПП 900101001</span>
                  </p>
                  <p>
                    <span>Банк получателя: </span>
                    <span style={{ fontWeight: 'bold' }}>Сбербанк БИК 046015602</span>
                  </p>
                  <p>
                    <span>Расчетный счет: </span>
                    <span style={{ fontWeight: 'bold' }}>Р/С 40703810452720000076</span>

                  </p>
                  <p>
                    <span>Назначение платежа: </span>
                    <span style={{ fontWeight: 'bold' }}>л/с 47 Чернышева Елена Георгиевна. взносы на содержание дома </span>
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
  ))
