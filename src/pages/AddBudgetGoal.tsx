import AddBudgetUI from '@/components/features/budget-goals/components/AddBudgetGoals'
import { useNavigate } from 'react-router-dom'

const AddBudgetGoal = () => {
  const navigate = useNavigate()
  return (
    <AddBudgetUI onCreateBudget={()=>navigate("/dashboard/budget-goals")} budgetToEdit={null} />
  )
}

export default AddBudgetGoal