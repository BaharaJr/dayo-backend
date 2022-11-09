export interface CalculatorErrorResponse {
  status: number;
  error: string;
}
export interface CalculatorSuccessResponse {
  message: string;
  status?: number;
}

export interface CalculatorInterface {
  id: string;
  left: number;
  right: number;
  operator: string;
  result: string;
  email: string;
  created: Date;
  lastUpdated: Date;
  status?: number;
}

export interface HistoryRequest {
  page: number;
  pageSize: number;
  email: string;
}

export interface HistoryResponse {
  history: CalculatorInterface[];
  total: number;
}
