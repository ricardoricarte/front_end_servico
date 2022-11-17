import React, { useEffect, useState } from 'react';
import './Servico.css';
import axios from 'axios';


function Servico() {

  const [servico, setServico] = useState({
    valorServico: '',
    nomeCliente: '', dataInicio: '', dataTermino: '',
    descricaoServico: '', valorPago: '', dataPagamento: ''
  });

  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar])

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/servico/").then(result => {
      setServicos(result.data);
    });
  }

  function buscarPagamentoPendente() {
    axios.get("http://localhost:8080/api/pagamentoPendente/").then(result => {
      setServicos(result.data);
    });
  }

  function buscarCancelados() {
    axios.get("http://localhost:8080/api/cancelados/").then(result => {
      setServicos(result.data);
    });
  }

  function limpar() {
    setServico({
      valorServico: '',
      nomeCliente: '', dataInicio: '', dataTermino: '',
      descricaoServico: '', valorPago: '', dataPagamento: ''
    });

  }

  function handleSubmit(event) {
    event.preventDefault();
    if (servico.id == undefined) {
      console.log("inserir")
      axios.post("http://localhost:8080/api/servico/", servico).then((result) => {
        setAtualizar(result);
      });
    } else {
      axios.put("http://localhost:8080/api/servico/", servico).then((result) => {
        setAtualizar(result);
      });
    }
    limpar();
  }

  function excluir(id) {
    axios.delete("http://localhost:8080/api/servico/" + id).then(result => {
      setAtualizar(result);
    });
  }

  function cancelar(id) {
    axios.post("http://localhost:8080/api/servico/" + id).then(result => {
      setAtualizar(result);
    });
  }

  return (
    <div className="container">
      <h1>CADASTRO DE SERVIÇOS</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-6">
          <div>
            <label className="form-label">Nome do Cliente</label>
            <input onChange={handleChange} value={servico.nomeCliente} name="nomeCliente" type="text" className="form-control" />
          </div>

          <div>
            <label className="form-label">Data de Inicio</label>
            <input onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio" type="date" className="form-control" />
          </div>

          <div>
            <label className="form-label">Data de Término</label>
            <input onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino" type="date" className="form-control" />
          </div>

          <div>
            <label className="form-label">Descrição de Servico</label>
            <input onChange={handleChange} value={servico.descricaoServico || ''} name="descricaoServico" type="text" className="form-control" />
          </div>

          <div>
            <label className="form-label">Valor do Serviço</label>
            <input onChange={handleChange} value={servico.valorServico || ''} name="valorServico" type="text" className="form-control" />
          </div>

          <div>
            <label className="form-label">Valor Pago</label>
            <input onChange={handleChange} value={servico.valorPago || ''} name="valorPago" type="text" className="form-control" />
          </div>

          <div>
            <label className="form-label">Data de Pagamento</label>
            <input onChange={handleChange} value={servico.dataPagamento || ''} name="dataPagamento" type="date" className="form-control" />
          </div>

          <br />

          <input type="submit" className="btn btn-success" value="Cadastrar"></input>

        </div>
      </form>
      <hr></hr>

      <button onCLick={buscarTodos} type="button" class="btn btn-primary">Listar Todos</button>&nbsp;&nbsp;
      <button onCLick={buscarPagamentoPendente} type="button" class="btn btn-info">Serviços com Pagamento Pendente</button>&nbsp;&nbsp;
      <button onCLick={buscarCancelados} type="button" class="btn btn-warning">Serviços Cancelados</button>&nbsp;&nbsp;

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor do Serviço</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            servicos.map(serv =>
              <tr key={serv.id}>
                <td>{serv.nomeCliente}</td>
                <td>{serv.descricaoServico}</td>
                <td>{serv.valorServico}</td>
                <td>{serv.status}</td>
                <td>
                  {serv.status != "cancelado" &&
                    <button onClick={() => setServico(serv)} className="btn btn-primary">Alterar</button>

                  }&nbsp;&nbsp;
                  {serv.status != "cancelado" &&
                    <button onClick={() => excluir(serv.id)} className="btn btn-danger">Excluir</button>
                  }&nbsp;&nbsp;
                  <button onClick={() => cancelar(serv.id)} className="btn btn-warning">Cancelar</button>
                </td>
              </tr>
            )}

        </tbody>
      </table>
    </div>
  );
}

export default Servico;
