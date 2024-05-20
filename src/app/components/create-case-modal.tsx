import { brasilStates } from "@/utils/states-uf";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCaseModal({ isOpen, onClose }: ModalProps) {
  const [caseForm, setCaseForm] = useState({
    selectedState: "",
    cases: "",
    deaths: "",
    recovered: "",
    selectedDate: "",
  });

  const handleChangeForm = (ev: any) => {
    setCaseForm({ ...caseForm, [ev.target.name]: ev.target.value });
  };

  const isFormValid = () => {
    return Object.values(caseForm).every((value) => value !== "");
  };

  const onCloseFN = () => {
    setCaseForm({
      selectedState: "",
      cases: "",
      deaths: "",
      recovered: "",
      selectedDate: "",
    });
    onClose;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseFN}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Caso</ModalHeader>
          <ModalCloseButton onClick={onCloseFN} />
          <ModalBody>
            <Select
              className="w-full mb-5"
              name="selectedState"
              onChange={(ev) => handleChangeForm(ev)}
              placeholder="Estado"
              isInvalid={caseForm.selectedState.length === 0}
            >
              {brasilStates.map((state) => (
                <option value={state.uf}>{state.name}</option>
              ))}
            </Select>
            <Input
              className="mb-5"
              placeholder="Casos confirmados"
              name="cases"
              onChange={(ev) => handleChangeForm(ev)}
              isInvalid={caseForm.cases.length === 0}
            />
            <Input
              className="mb-5"
              placeholder="Mortos"
              name="deaths"
              isInvalid={caseForm.deaths.length === 0}
              onChange={(ev) => handleChangeForm(ev)}
            />
            <Input
              className="mb-5"
              placeholder="Recuperados"
              name="recovered"
              isInvalid={caseForm.recovered.length === 0}
              onChange={(ev) => handleChangeForm(ev)}
            />

            <Input
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              name="selectedDate"
              isInvalid={caseForm.selectedDate.length === 0}
              onChange={(ev) => handleChangeForm(ev)}
              placeholder="Selecione uma data"
              size="md"
              type="text"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
            <Button
              disabled={isFormValid()}
              onClick={() => window.alert(JSON.stringify(caseForm))}
              colorScheme="green"
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
