export type Machine = {
    id: string;
    name: string;
    type: string;
    location: string;
    status: string;
  };
  
  let machines: Machine[] = [
    { id: '1', name: 'Máquina A', type: 'Industrial', location: 'Setor 1', status: 'OK' },
    { id: '2', name: 'Máquina B', type: 'Agrícola', location: 'Setor 2', status: 'Em Manutenção' },
    { id: '3', name: 'Máquina C', type: 'Manufatura', location: 'Setor 3', status: 'OK' },
  ];
  
  export const addMachine = (machine: Machine) => {
    machines.push(machine);
  };
  
  export const getMachines = () => machines;
  
  export const deleteMachine = (id: string) => {
    machines = machines.filter(machine => machine.id !== id);
  };