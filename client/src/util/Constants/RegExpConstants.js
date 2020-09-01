const regExpConsts = {
  email: {
    name: 'Correo electrónico',
    // eslint-disable-next-line no-useless-escape
    value: /^[A-Za-z0-9.]*\@[A-Za-z0-9]*\.[A-Za-z0-9]{2,3}$/,
  },
  date: {
    name: 'Fecha (dd/MM/yyyy)',
    // eslint-disable-next-line no-useless-escape
    value: /^[0-9]{2,2}\/[0-9]{2,2}\/[0-9]{4,4}$/,
  },
  DNI: {
    name: 'Identificación nacional',
    // eslint-disable-next-line no-useless-escape
    value: /^[0-9]{1,1}\-[0-9]{4,4}\-[0-9]{4,4}$/,
  },
};

export default regExpConsts;
