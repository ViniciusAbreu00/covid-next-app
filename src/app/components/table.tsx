"use client";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CovidAPIResponseData } from "../@types";

interface TableProps {
  data: CovidAPIResponseData[];
}

export function CovidTableData({ data }: TableProps) {
  return (
    <TableContainer className="mt-5">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Local</Th>
            <Th>Casos</Th>
            <Th>Mortes</Th>
            <Th>Suspeitos</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((data) => (
            <Tr>
              <Td>{data.uf ?? data.country}</Td>
              <Td>{data.cases}</Td>
              <Td>{data.deaths}</Td>
              <Td>{data.suspects}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
