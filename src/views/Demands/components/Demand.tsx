import Button from 'components/Button'
import { DemandDTO, Priority, Supply } from 'contexts/types'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TranslatedEntry from 'components/TranslatedEntry'

const Demand = ({
  className,
  supply,
  placeId,
  saveDemand,
  priorities,
  onSelected,
  isSelected
}: {
  className?: string
  supply: Supply
  placeId: string
  priorities: Priority[]
  saveDemand: (demand: DemandDTO) => Promise<boolean>
  onSelected: (supplyId: string) => void
  isSelected: boolean
}) => {
  const [addedToList, setAddedToList] = useState<boolean>(false)
  const [demandDTO, setDemandDTO] = useState<DemandDTO>({
    placeId,
    supplyId: supply.id,
    comment: '',
    priorityId: ''
  })

  useEffect(() => {
    setDemandDTO({ ...demandDTO, priorityId: priorities[0]?.id })
  }, [priorities])

  const handleDemandSave = useCallback(() => {
    if (!demandDTO.priorityId && !demandDTO.placeId) return
    saveDemand({ ...demandDTO, placeId }).then((saved: boolean) => {
      if (saved) {
        onSelected('')
        setAddedToList(true)
      }
    })
  }, [demandDTO, placeId])

  return (
    <div className={className}>
      <DemandTitle
        onClick={() => onSelected(supply.id)}
        isSelected={isSelected}
      >
        <Title>
          {addedToList && <CheckIcon />}{' '}
          <span>
            <TranslatedEntry entry={supply} />
          </span>
        </Title>
        <AddIcon>+</AddIcon>
      </DemandTitle>
      {isSelected && (
        <DemandDetails>
          <PrioritiesWrapper>
            {priorities.map((priority, key) => (
              <PriorityWrapper
                key={key}
                onClick={() =>
                  setDemandDTO({ ...demandDTO, priorityId: priority.id })
                }
              >
                <input
                  type="radio"
                  name={priority.id}
                  checked={priority.id === demandDTO.priorityId}
                  readOnly
                />
                <PriorityInputLabel htmlFor={priority.id}>
                  <TranslatedEntry entry={priority} />
                </PriorityInputLabel>
              </PriorityWrapper>
            ))}
          </PrioritiesWrapper>
          <FormGroup>
            <Label>Komentarz</Label>
            <TextInput
              id="comment"
              type="text"
              placeholder="Komentarz, np. buty rozmiar 36 "
              value={demandDTO.comment || ''}
              onChange={e =>
                setDemandDTO({ ...demandDTO, comment: e.target.value })
              }
            />
          </FormGroup>
          <StyledButton onClick={handleDemandSave}>Dodaj do listy</StyledButton>
        </DemandDetails>
      )}
    </div>
  )
}

export default styled(Demand)`
  padding: 1rem 1.2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px -5px 14px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.8rem;
  width: 100%;
`

const DemandTitle = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem 1.2rem;
  margin: -1rem -1.2rem;
  ${({ isSelected }) =>
    isSelected &&
    `
    cursor: auto;
  `}
`

const AddIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #333;
  border: 1px solid #333;
  border-radius: 50%;
`

const DemandDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  margin: 1.4rem 0 1rem;
`

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  margin-top: 0.8rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const PrioritiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`

const PriorityWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin: 0 0 8px;
`

const PriorityInputLabel = styled.label`
  padding: 2px 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey900};
  align-self: flex-start;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CheckIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: #00e676;
  position: relative;
  color: white;
  &:after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
