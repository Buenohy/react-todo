import React from 'react';
import Text from '../components/text';
import Badge from '../components/badge';

export default function TaskSummary() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Text variant="body-sm-bold" className="!text-gray-300">
          Tarefas criadas
        </Text>
        <Badge variant="secondary">5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Text variant="body-sm-bold" className="!text-gray-300">
          Concluídas
        </Text>
        <Badge variant="primary">2 de 5</Badge>
      </div>
    </>
  );
}
