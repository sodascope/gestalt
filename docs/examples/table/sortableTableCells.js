// @flow strict
import { type Node, useState } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function SortableHeaderExample(): Node {
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortCol, setSortCol] = useState('name');

  const onSortChange = (col: string) => {
    if (sortCol !== col) {
      setSortCol(col);
      setSortOrder('desc');
    } else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <Table accessibilityLabel="Sortable header cells">
        <Table.Header>
          <Table.Row>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('id')}
              sortOrder={sortOrder}
              status={sortCol === 'id' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Id</Text>
            </Table.SortableHeaderCell>
            <Table.SortableHeaderCell
              onSortChange={() => onSortChange('name')}
              sortOrder={sortOrder}
              status={sortCol === 'name' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Name</Text>
            </Table.SortableHeaderCell>

            <Table.SortableHeaderCell
              align="end"
              onSortChange={() => onSortChange('cost')}
              sortOrder={sortOrder}
              status={sortCol === 'cost' ? 'active' : 'inactive'}
            >
              <Text weight="bold">Cost</Text>
            </Table.SortableHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Row>
          <Table.Cell>
            <Text>123</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Snax</Text>
          </Table.Cell>
          <Table.Cell>
            <Text align="end">$50</Text>
          </Table.Cell>
        </Table.Row>
      </Table>
    </Box>
  );
}
