## 📂 Estrutura do Projeto

```plaintext
mb-users/
├── src/
│   ├── database/                                     # Banco de dados simulado
│   │   └── registration.json                         # Arquivo JSON para simular registros
│   ├── registration/                                 # Módulo de registro
│   │   ├── registration.controller.js                # Controlador do registro
│   │   ├── registration.model.js                     # Modelo do registro
│   │   ├── registration.module.js                    # Módulo de rotas do registro
│   ├── schemas/                                      # Schemas de validação
│   │   └── registration.schema.js                    # Schema para validação de registro
│   ├── services/                                     # Serviços da aplicação
│   │   └── render.service.js                         # Serviço para renderização de páginas
│   ├── utils/                                        # Funções utilitárias reutilizáveis
│   │   └── index.js                                  # Exportação de utilitários
│   ├── validators/                                   # Validações personalizadas
│   │   ├── index.js                                  # Exportação de validadores
│   │   └── registration.validator.js                 # Validações específicas para registro
│   ├── views/                                        # Camada view da aplicação
│   │   ├── assets/                                   # Recursos estáticos
│   │   │   ├── directives/                           # Diretivas personalizadas
│   │   │   │   └── mask/                             # Diretiva de máscara
│   │   │   │       └── index.js                      # Implementação da diretiva de máscara
│   │   │   ├── styles/                               # Estilos da aplicação
│   │   │   │   ├── main.scss                         # Estilos principais
│   │   │   │   ├── layouts/                          # Estilos de layout
│   │   │   │   │   ├── _typography.scss              # Estilos de tipografia
│   │   │   │   │   └── _container.scss               # Estilos de container
│   │   │   │   ├── utils/                            # Estilos utilitários
│   │   │   │   │   ├── _normalize.scss               # Normalização de estilos
│   │   │   │   │   └── _reset.scss                   # Reset de estilos
│   │   │   │   └── variables/                        # Variáveis de estilo
│   │   │   │       ├── _colors.variables.scss        # Variáveis de cores
│   │   │   │       ├── _typography.variables.scss    # Variáveis de tipografia
│   │   │   │       └── _ui.variables.scss            # Variáveis de UI
│   │   ├── components/                               # Componentes da aplicação
│   │   │   ├── Button/                               # Componente de botão
│   │   │   │   ├── Button.vue                        # Implementação do botão
│   │   │   │   └── index.js                          # Exportação do componente
│   │   │   ├── Input/                                # Componente de input
│   │   │   │   ├── Input.vue                         # Implementação do input
│   │   │   │   └── index.js                          # Exportação do componente
│   │   │   ├── Radio/                                # Componente de botão de rádio
│   │   │   │   ├── RadioButton.vue                   # Implementação do botão de rádio
│   │   │   │   └── index.js                          # Exportação do componente
│   │   │   └── Toast/                                # Componente de toast
│   │   │       ├── toast.scss                        # Estilos do toast
│   │   │       └── index.js                          # Implementação e exportação do toast
│   │   ├── modules/                                  # Módulos da aplicação
│   │   │   └── registration/                         # Módulo de registro
│   │   │       ├── components/                       # Componentes do módulo
│   │   │       │   ├── StepOne.vue                   # Primeiro passo do registro
│   │   │       │   ├── StepTwo.vue                   # Segundo passo do registro
│   │   │       │   ├── StepThree.vue                 # Terceiro passo do registro
│   │   │       │   └── StepFour.vue                  # Quarto passo do registro
│   │   │       ├── locales/                          # Traduções do módulo
│   │   │       │   └── index.js                      # Configuração de internacionalização
│   │   │       ├── pages/                            # Páginas do módulo
│   │   │       │   └── RegistrationPage.vue          # Página principal do registro
│   │   │       ├── services/                         # Serviços do módulo
│   │   │       │   └── registration-service.js       # Serviço para lógica de registro
│   │   │       ├── store/                            # Estado do módulo
│   │   │       │   └── registration-composable.js    # Gerenciamento de estado do registro
│   │   │       └── instance.js                       # Inicialização do módulo de registro
│   ├── index.html                                    # Arquivo HTML principal
│   └── main.js                                       # Arquivo de inicialização do frontend
├── .env                                              # Variáveis de ambiente
├── .gitignore                                        # Arquivos ignorados pelo Git
├── jsconfig.json                                     # Configuração de paths para o editor
├── nodemon.json                                      # Configuração do Nodemon
├── package.json                                      # Dependências e scripts globais do projeto
├── README.md                                         # Documentação do projeto
├── vite.config.js                                    # Configuração do Vite para build e middleware
```