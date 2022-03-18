import { ReactNode } from 'react'
import styled from 'styled-components'
import backArrow from 'assets/back-arrow.svg'
import { useNavigate } from 'react-router-dom'

const PageTitle = ({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) => {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <GoBack onClick={() => navigate(-1)}>
        <BackIcon src={backArrow} alt="go back" />
      </GoBack>
      {children}
    </div>
  )
}

export default styled(PageTitle)`
  width: 100%;
  padding: 1.4rem 1.2rem;
  padding-left: 3.6rem;
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 1.45rem;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`

const BackIcon = styled.img`
  display: inline-block;
  height: 24px;
  width: auto;
  margin-left: 0.8rem;
  margin-top: 4px;
`

const GoBack = styled.span`
  display: inline-block;
  position: absolute;
  left: 0;
  padding: 0.4rem;
`
