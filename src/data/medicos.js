// Dados-semente extraídos das prints da planilha "Planilha Vidamed 2026" e "Planilha Médicos"
export const MEDICOS_SEED = [
  {
    id: 'm001', nome: 'JACKSON MENEZES SILVA', crm: '8438/AL', cpf: '057.428.674-84',
    rg: '2.345.678 SSP/AL', nascimento: '1983-07-10', telefone: '(82) 99613-9664',
    email: 'jackson.silva@vidamed.com', cep: '57044-098',
    endereco: 'Avenida José Aprígio, 234 - Jatiúca - Maceió/AL',
    modalidade: 'CPF', chavePix: '057.428.674-84',
    especialidade: 'Clínica Médica', status: 'ativo',
    cadastradoEm: '2024-03-15', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm002', nome: 'VANESSA FERNANDA MACIEL SEREJO', crm: '7309/AL', cpf: '116.843.427-08',
    rg: '3.456.789 SSP/AL', nascimento: '1987-07-23', telefone: '(63) 9 8134-0466',
    email: 'vanessa.serejo@vidamed.com', cep: '57035-854',
    endereco: 'Rua Governador, 120 - Centro - Maceió/AL',
    modalidade: 'CPF', chavePix: '116.843.427-08',
    especialidade: 'Ginecologia', status: 'ativo',
    cadastradoEm: '2024-01-20', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm003', nome: 'ANDRE COSTA CORREA', crm: '1191/AL', cpf: '121.558.154-84',
    rg: '4.567.890 SSP/AL', nascimento: '1998-05-21', telefone: '(82) 9 9334-8295',
    email: 'andre.correa@vidamed.com', cep: '57055-130',
    endereco: 'Rua Conselheiro, 88 - Farol - Maceió/AL',
    modalidade: 'Celular', chavePix: '(82) 9 9334-8295',
    especialidade: 'Emergência', status: 'ativo',
    cadastradoEm: '2025-02-10', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm004', nome: 'CAMILA MARIA VIEIRA DE CARVALHO', crm: '9648/AL', cpf: '077.670.504-08',
    rg: '5.678.901 SSP/AL', nascimento: '1989-12-08', telefone: '(82) 9 9650-3545',
    email: 'camila.carvalho@vidamed.com', cep: '57048-192',
    endereco: 'Rua V, nº 191, Bairro Antares - Maceió/AL',
    modalidade: 'CPF', chavePix: '077.670.504-08',
    especialidade: 'Plantonista', status: 'ativo',
    cadastradoEm: '2024-06-05', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm005', nome: 'DARLAN MEDEIROS DE MAGALHAES JUNIOR', crm: '10195/AL', cpf: '016.366.274-63',
    rg: '6.789.012 SSP/AL', nascimento: '1990-08-14', telefone: '(81) 9 9604-6359',
    email: 'darlan.medeiros@vidamed.com', cep: '57.035-700',
    endereco: 'Avenida Doutor, 450 - Mangabeiras - Maceió/AL',
    modalidade: 'CPF', chavePix: '016.366.274-63',
    especialidade: 'UTI', status: 'ativo',
    cadastradoEm: '2024-09-12', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm006', nome: 'ISADORA CRISTINA RODRIGUES DE AMORIM PEREIRA', crm: '10639/AL', cpf: '089.648.644-33',
    rg: '7.890.123 SSP/AL', nascimento: '1997-09-11', telefone: '(82) 9 8868-6855',
    email: 'isadora.pereira@vidamed.com', cep: '57025-032',
    endereco: 'Rua Luiz Campos, 56 - Pajuçara - Maceió/AL',
    modalidade: 'Celular', chavePix: '(82) 9 8868-6855',
    especialidade: 'Plantonista', status: 'ativo',
    cadastradoEm: '2025-01-08', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm007', nome: 'IGOR DO NASCIMENTO LINS', crm: '6193-AL', cpf: '077.106.704-66',
    rg: '8.901.234 SSP/AL', nascimento: '1986-08-12', telefone: '(82) 99912-1404',
    email: 'igor.lins@vidamed.com', cep: '57035-390',
    endereco: 'Rua Doutor José, 32 - Centro - Maceió/AL',
    modalidade: 'CPF', chavePix: '096.455.464-00',
    especialidade: 'Emergência', status: 'ativo',
    cadastradoEm: '2023-11-22', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm008', nome: 'ELISA CARLA HILGEMBERG', crm: '10257/AL', cpf: '119.287.184-77',
    rg: '9.012.345 SSP/AL', nascimento: '1998-12-05', telefone: '(82) 9 9160-0914',
    email: 'elisa.hilgemberg@vidamed.com', cep: '57.035-226',
    endereco: 'Rua Doutor Oliveira, 78 - Ponta Verde - Maceió/AL',
    modalidade: 'CPF', chavePix: '119.287.184-77',
    especialidade: 'Pediatria', status: 'ativo',
    cadastradoEm: '2024-04-18', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm009', nome: 'LEANDRO ALVES LINO ACIOLY DE CARVALHO', crm: '8753/AL', cpf: '081.264.564-26',
    rg: '0.123.456 SSP/AL', nascimento: '1992-11-27', telefone: '(82) 9 8823-3970',
    email: 'leandro.carvalho@vidamed.com', cep: '57.046-775',
    endereco: 'Rua Carlos Alberto, 102 - Mangabeiras - Maceió/AL',
    modalidade: 'Celular', chavePix: '(82) 9 8823-3970',
    especialidade: 'Cirurgia Geral', status: 'ativo',
    cadastradoEm: '2024-07-30', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm010', nome: 'MAC DOUGLAS DE OLIVEIRA LIMA', crm: '11005-AL', cpf: '121.292.844-00',
    rg: '1.234.567 SSP/AL', nascimento: '1999-08-26', telefone: '(84) 9 9464-1997',
    email: 'mac.douglas@vidamed.com', cep: '57025-043',
    endereco: 'Rua Dr. Zeferino, 45 - Farol - Maceió/AL',
    modalidade: 'CPF', chavePix: '121.292.844-00',
    especialidade: 'Plantonista', status: 'ativo',
    cadastradoEm: '2024-10-14', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm011', nome: 'JOAO MARQUES DE OLIVEIRA JUNIOR', crm: '11912/AL', cpf: '095.866.024-78',
    rg: '2.345.678 SSP/AL', nascimento: '1993-01-11', telefone: '(82) 9 9669-6152',
    email: 'joao.marques@vidamed.com', cep: '57052-800',
    endereco: 'Rua Azarias, 67 - Tabuleiro - Maceió/AL',
    modalidade: 'Celular', chavePix: '(82) 9 9669-6152',
    especialidade: 'Emergência', status: 'ativo',
    cadastradoEm: '2024-12-03', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm012', nome: 'LORENA DOS SANTOS SA', crm: '12104/AL', cpf: '098.765.432-10',
    rg: '3.456.789 SSP/AL', nascimento: '1995-04-22', telefone: '(82) 9 9555-1234',
    email: 'lorena.sa@vidamed.com', cep: '57030-100',
    endereco: 'Av. Fernandes Lima, 1500 - Farol - Maceió/AL',
    modalidade: 'CPF', chavePix: '098.765.432-10',
    especialidade: 'Plantonista', status: 'ativo',
    cadastradoEm: '2025-03-01', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm013', nome: 'ISABELA MACIEL BRAGA DE SOUZA', crm: '12205/AL', cpf: '102.345.678-90',
    rg: '4.567.890 SSP/AL', nascimento: '1996-06-18', telefone: '(82) 9 9444-5678',
    email: 'isabela.braga@vidamed.com', cep: '57020-450',
    endereco: 'Rua Sá e Albuquerque, 250 - Jaraguá - Maceió/AL',
    modalidade: 'CPF', chavePix: '102.345.678-90',
    especialidade: 'UTI', status: 'ativo',
    cadastradoEm: '2025-04-10', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  },
  {
    id: 'm014', nome: 'JULIA CABRAL BARRETO', crm: '12380/AL', cpf: '105.678.901-23',
    rg: '5.678.901 SSP/AL', nascimento: '1997-10-05', telefone: '(82) 9 9333-7890',
    email: 'julia.barreto@vidamed.com', cep: '57025-700',
    endereco: 'Rua Engenheiro Mário de Gusmão, 980 - Ponta Verde - Maceió/AL',
    modalidade: 'CPF', chavePix: '105.678.901-23',
    especialidade: 'Telemedicina', status: 'ativo',
    cadastradoEm: '2025-02-25', documentos: { rg_cnh: true, comprovante_residencia: true, diploma: true, crm: true }
  }
]

export const getMedico = (id) => MEDICOS_SEED.find(m => m.id === id)
