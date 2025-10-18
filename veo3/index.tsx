/* tslint:disable */
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from '@google/genai';

// --- Types and Interfaces ---
declare global {
  interface AIStudio {
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

// --- Prompt Builder Data ---
const promptCategories = [
  {
    korean: '🎨 전체 스타일 / 형식',
    english: 'Style / Format',
    options: {
      '시네마틱 장면': 'A cinematic scene',
      '3D 애니메이션': '3D animation',
      '2D 애니메이션': '2D animation',
      '영화 예고편': 'Movie trailer style',
      '역사적 영상': 'Historical footage style',
      '다큐멘터리 스타일': 'Documentary style',
      '애니메 스타일': 'Anime style',
      '뮤직비디오': 'Music video style',
      '패션 필름': 'Fashion film',
      '아트 필름': 'Art film style',
      '느와르 스타일': 'Noir style',
      SF: 'Sci-fi style',
      판타지: 'Fantasy style',
      호러: 'Horror style',
    },
  },
  {
    korean: '🎬 장면 개요',
    english: 'Scene Overview',
    options: {
      '장대한 전투 장면': 'An epic battle scene',
      '로맨틱한 만남': 'A romantic encounter',
      '미스터리 수사': 'A mystery investigation',
      '평화로운 자연 장면': 'A peaceful nature scene',
      '미래도시 풍경': 'A futuristic cityscape',
      '역사적 순간': 'A historical moment',
      '꿈의 시퀀스': 'A dream sequence',
      '액션 추격전': 'An action chase scene',
    },
  },
  {
    korean: '🧍 주체 / 캐릭터',
    english: 'Subject / Character',
    options: {
      '20대 한국 아이돌같은 여성':
        'A stylish young woman in her 20s with the beauty and physique of a K-pop idol',
      '20대 젊은 여성': 'A young woman in her 20s',
      '중년 남성': 'A middle-aged man',
      노인: 'An elderly person',
      아이: 'A child',
      '갑옷을 입은 전사': 'A warrior in armor',
      '지팡이를 든 마법사': 'A wizard with a staff',
      '코트를 입은 탐정': 'A detective in a trench coat',
    },
  },
  {
    korean: '🌆 환경 / 배경',
    english: 'Environment / Background',
    options: {
      '사이버펑크 도시 (밤)': 'A cyberpunk city at night',
      '중세 성': 'A medieval castle',
      '일본 정원 (벚꽃)': 'A Japanese garden with cherry blossoms',
      '우주 정거장': 'A space station',
      '마법의 숲': 'An enchanted forest',
      '사막의 석양': 'A desert at sunset',
      '수중 산호초': 'An underwater coral reef',
      '눈 덮인 산봉우리': 'A snow-covered mountain peak',
    },
  },
  {
    korean: '🏃 행동 / 움직임',
    english: 'Action / Movement',
    options: {
      '천천히 걷기': 'walking slowly',
      달리기: 'running',
      춤추기: 'dancing',
      전투: 'fighting',
      '슬로우모션 떠오르기': 'floating in slow motion',
      '열정적으로 요리하기': 'cooking passionately',
      '그림 그리기': 'painting a picture',
      명상하기: 'meditating',
    },
  },
  {
    korean: '🔊 오디오스케이프',
    english: 'Audioscape',
    options: {
      '오케스트라 음악': 'Orchestral music score',
      '앰비언트 일렉트로닉': 'Ambient electronic soundtrack',
      '새소리 자연음': 'Sounds of nature and birds chirping',
      '피아노 멜로디': 'A gentle piano melody',
      '전투 사운드': 'Sounds of battle',
      '도시 소음': 'The bustle of city noise',
    },
  },
  {
    korean: '🎥 카메라 샷 / 구도',
    english: 'Camera Shot / Composition',
    options: {
      '극단적 클로즈업': 'Extreme close-up shot',
      클로즈업: 'Close-up shot',
      '미디엄 샷': 'Medium shot',
      '와이드샷': 'Wide shot',
      '극단적 와이드샷': 'Extreme wide shot',
      '3분의 1 법칙 구도': 'Composition using the rule of thirds',
      '중앙 구도': 'Centered composition',
      '대칭 구도': 'Symmetrical composition',
    },
  },
  {
    korean: '🎞️ 카메라 각도 및 움직임',
    english: 'Camera Angle & Movement',
    options: {
      '로우 앵글': 'Low angle shot',
      '하이 앵글': 'High angle shot',
      '아이 레벨': 'Eye-level shot',
      버드아이뷰: 'Bird-eye view',
      '돌리 인': 'Dolly in',
      '트래킹 샷': 'Tracking shot',
      '핸드헬드 카메라': 'Handheld camera movement',
      '드론 샷': 'Drone shot',
      '줌 인': 'Zoom in',
      '팬 (좌/우)': 'Panning shot',
    },
  },
  {
    korean: '💡 조명',
    english: 'Lighting',
    options: {
      '로우키 조명': 'Low-key lighting',
      '하이키 조명': 'High-key lighting',
      '황금 시간대 햇빛': 'Golden hour sunlight',
      '네온 조명': 'Neon lighting',
      '촛불 분위기': 'Candlelight atmosphere',
      달빛: 'Moonlight',
      '역광 실루엣': 'Backlit silhouette',
      '림 라이팅': 'Rim lighting',
    },
  },
  {
    korean: '🎨 색상 팔레트',
    english: 'Color Palette',
    options: {
      '생생한 색상': 'Vibrant color palette',
      '단색 파랑': 'Monochromatic blue palette',
      '따뜻한 흙빛': 'Warm earth tones',
      '차가운 파스텔': 'Cool pastel colors',
      '흑백 대비': 'High-contrast black and white',
      '네온 사이버펑크': 'Neon cyberpunk colors',
      '빈티지 세피아': 'Vintage sepia tones',
    },
  },
  {
    korean: '🪄 최종 스타일 노트',
    english: 'Final Style Notes',
    options: {
      포토리얼리스틱: 'photorealistic',
      '70mm 필름': 'shot on 70mm film',
      '35mm 필름': 'shot on 35mm film',
      '초현실적 / 몽환적': 'surreal and dreamlike',
      '수채화 스타일': 'watercolor style',
      '유화 스타일': 'oil painting style',
      '하이퍼 리얼 CGI': 'hyper-realistic CGI',
      '필름 그레인': 'with film grain',
      '픽사 스타일': 'Pixar animation style',
      '지브리 스타일': 'Ghibli animation style',
    },
  },
];

function main() {
  // --- DOM Element Selection ---
  const upload = document.querySelector('#file-input') as HTMLInputElement;
  const generateButton = document.querySelector(
    '#generate-button',
  ) as HTMLButtonElement;
  const video = document.querySelector('#video') as HTMLVideoElement;
  const fileNameEl = document.querySelector('#file-name') as HTMLSpanElement;
  const imgPreview = document.querySelector('#img-preview') as HTMLImageElement;
  const statusEl = document.querySelector('#status') as HTMLDivElement;
  const promptBuilderGrid = document.querySelector(
    '#prompt-builder-grid',
  ) as HTMLDivElement;
  const finalPromptOutput = document.querySelector(
    '#final-prompt-output',
  ) as HTMLTextAreaElement;
  const createPromptButton = document.querySelector(
    '#create-prompt-button',
  ) as HTMLButtonElement;
  const copyPromptButton = document.querySelector(
    '#copy-prompt-button',
  ) as HTMLButtonElement;

  // --- State Variables ---
  let base64data = '';

  // --- Utility Functions ---
  async function openApiKeyDialog() {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
    } else {
      showStatusError(
        'API key selection is not available. Please configure API_KEY.',
      );
    }
  }

  async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function blobToBase64(blob: Blob) {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        resolve(url.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  }

  function downloadFile(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function showStatusError(message: string) {
    statusEl.innerHTML = `<span class="text-red-400">${message}</span>`;
  }

  function setControlsDisabled(disabled: boolean) {
    generateButton.disabled = disabled;
    upload.disabled = disabled;
    createPromptButton.disabled = disabled;
    copyPromptButton.disabled = disabled;

    document
      .querySelectorAll(
        '#prompt-builder-grid select, #prompt-builder-grid input',
      )
      .forEach((el) => ((el as HTMLSelectElement).disabled = disabled));
  }

  // --- Core Application Logic ---

  /**
   * Initializes the prompt builder UI by creating select and input elements.
   */
  function initPromptBuilder() {
    for (const category of promptCategories) {
      const container = document.createElement('div');
      container.className = 'flex flex-col space-y-2';
      // Store the English category name in a data attribute for later use
      (container as HTMLElement).dataset.englishCategory = category.english;

      const label = document.createElement('label');
      label.textContent = category.korean; // Display Korean in the UI
      label.className = 'text-sm font-medium text-gray-400';
      container.appendChild(label);

      const select = document.createElement('select');
      select.className =
        'builder-select w-full bg-[#353739] border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500';
      select.innerHTML = `<option value="">선택 안 함</option>`;

      for (const [optionKo, optionEn] of Object.entries(category.options)) {
        select.innerHTML += `<option value="${optionEn}">${optionKo}</option>`;
      }
      select.innerHTML += `<option value="direct_input">직접 입력</option>`;
      container.appendChild(select);

      const input = document.createElement('input');
      input.type = 'text';
      input.className =
        'builder-input hidden w-full bg-[#353739] border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500';
      input.placeholder = '직접 입력...';
      container.appendChild(input);

      select.addEventListener('change', () => {
        if (select.value === 'direct_input') {
          input.classList.remove('hidden');
          input.focus();
        } else {
          input.classList.add('hidden');
          input.value = '';
        }
      });

      promptBuilderGrid.appendChild(container);
    }
  }

  /**
   * Translates a given text to English using the Gemini API.
   */
  async function translateToEnglish(
    text: string,
    apiKey: string,
  ): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following text into English. Respond with only the translated text, without any introductory phrases or explanations. Text to translate: "${text}"`,
        config: {
          systemInstruction:
            'You are a translation assistant. Your only task is to translate the given text to English. Do not add any extra text, commentary, or quotation marks. Just provide the direct translation.',
          temperature: 0.1,
        },
      });
      return response.text.trim();
    } catch (error) {
      console.error('Translation failed:', error);
      throw new Error('Failed to translate user input.');
    }
  }

  /**
   * Gathers values from the prompt builder UI and assembles the final prompt string.
   * Translates direct inputs to English.
   */
  async function assemblePrompt() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      showStatusError(
        'API key is required for translation. Please add your API key.',
      );
      await openApiKeyDialog();
      return ''; // Return empty string to signal failure
    }

    statusEl.innerText = 'Assembling and translating prompt...';
    setControlsDisabled(true);

    try {
      const promptPromises = Array.from(
        promptBuilderGrid.querySelectorAll('.flex.flex-col'),
      ).map(async (container) => {
        const select = container.querySelector('select') as HTMLSelectElement;
        const input = container.querySelector('input') as HTMLInputElement;
        const category =
          (container as HTMLElement).dataset.englishCategory || '';

        let value = '';
        if (select.value === 'direct_input' && input.value.trim() !== '') {
          const originalText = input.value.trim();
          value = await translateToEnglish(originalText, apiKey);
        } else if (select.value && select.value !== 'direct_input') {
          value = select.value;
        }

        if (value) {
          return `[${category}] ${value}`;
        }
        return null;
      });

      const resolvedParts = await Promise.all(promptPromises);
      const parts = resolvedParts.filter((part) => part !== null) as string[];

      const finalPrompt = parts.join('\n');
      finalPromptOutput.value = finalPrompt;
      return finalPrompt;
    } catch (e) {
      const errorMessage =
        e instanceof Error
          ? e.message
          : 'An unknown error occurred during translation.';
      showStatusError(`Error: ${errorMessage}`);
      return '';
    } finally {
      setControlsDisabled(false);
    }
  }

  /**
   * Analyzes an uploaded image and generates a descriptive prompt.
   */
  async function generatePromptFromImage(imageData: string, apiKey: string) {
    statusEl.innerText = 'Analyzing image to generate prompt...';
    setControlsDisabled(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageData,
              },
            },
            {
              text: 'Describe this image in extreme detail for a video generation AI. Be very descriptive about the subject, the environment, the lighting, the colors, the style, and potential actions. Formulate it as a single, cohesive prompt string.',
            },
          ],
        },
      });

      finalPromptOutput.value = response.text.trim();
      statusEl.innerText =
        'Image analysis complete. You can now refine the prompt.';
    } catch (e) {
      console.error('Image prompt generation failed:', e);
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred.';
      showStatusError(`Error generating prompt from image: ${errorMessage}`);
    } finally {
      setControlsDisabled(false);
    }
  }

  /**
   * Main function to generate the video using the Veo API.
   */
  async function generateVideo(
    prompt: string,
    imageBytes: string,
    apiKey: string,
  ) {
    const ai = new GoogleGenAI({ apiKey });

    const params: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: {
        numberOfVideos: 1,
      },
    };

    if (imageBytes) {
      params.image = {
        imageBytes,
        mimeType: 'image/png', // Assuming PNG, adjust if needed
      };
    }

    statusEl.innerText = 'Generating video... This may take a few minutes.';
    let operation = await ai.models.generateVideos(params);

    let pollCount = 0;
    const maxPolls = 30; // Increased polls for longer generation
    while (!operation.done && pollCount < maxPolls) {
      pollCount++;
      console.log(`Polling for completion (attempt ${pollCount})...`);
      await delay(10000); // Poll every 10 seconds
      try {
        operation = await ai.operations.getVideosOperation({ operation });
      } catch (e) {
        console.error('Error polling for operation status:', e);
        throw new Error(
          'Failed to get video generation status. Please try again.',
        );
      }
    }

    if (!operation.done) {
      throw new Error(
        'Video generation timed out. Please try again with a simpler prompt.',
      );
    }

    const videos = operation.response?.generatedVideos;
    if (!videos || videos.length === 0) {
      throw new Error(
        'No videos were generated. The prompt may have been blocked.',
      );
    }

    statusEl.innerText = 'Downloading video...';

    for (const [i, v] of videos.entries()) {
      const url = decodeURIComponent(v.video.uri);
      const res = await fetch(`${url}&key=${apiKey}`);
      const blob = await res.blob();
      const objectURL = URL.createObjectURL(blob);
      downloadFile(objectURL, `video${i}.mp4`);
      video.src = objectURL;
      video.style.display = 'block';
    }
  }

  /**
   * Orchestrates the video generation process, including API key checks and error handling.
   */
  async function startGeneration() {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      showStatusError('API key is not configured. Please add your API key.');
      await openApiKeyDialog();
      return;
    }

    const displayPrompt = finalPromptOutput.value;
    if (!displayPrompt.trim()) {
      showStatusError('Please generate a prompt before creating a video.');
      return;
    }

    // Clean the prompt for the API, removing the [category] prefixes
    const apiPrompt = displayPrompt
      .split('\n')
      .map((line) => {
        const closingBracketIndex = line.indexOf('] ');
        if (closingBracketIndex !== -1) {
          return line.substring(closingBracketIndex + 2);
        }
        return line; // Return the line as is if the format is unexpected
      })
      .filter((part) => part.trim() !== '') // Remove any empty parts
      .join(', ');

    statusEl.innerText = 'Initializing video generation...';
    video.style.display = 'none';
    setControlsDisabled(true);

    try {
      await generateVideo(apiPrompt, base64data, apiKey);
      statusEl.innerText = 'Video generated and downloaded successfully.';
    } catch (e) {
      console.error('Video generation failed:', e);
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred.';

      let userFriendlyMessage = `Error: ${errorMessage}`;
      if (errorMessage.includes('Requested entity was not found.')) {
        userFriendlyMessage =
          'Model not found. This can be caused by an invalid API key or permission issues. Please select a valid key.';
        await openApiKeyDialog();
      } else if (
        errorMessage.includes('API_KEY_INVALID') ||
        errorMessage.toLowerCase().includes('permission denied')
      ) {
        userFriendlyMessage =
          'Your API key is invalid. Please add a valid API key.';
        await openApiKeyDialog();
      }
      showStatusError(userFriendlyMessage);
    } finally {
      setControlsDisabled(false);
    }
  }

  // --- Event Listeners ---
  upload.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      fileNameEl.textContent = file.name;
      base64data = await blobToBase64(file);
      imgPreview.src = `data:image/png;base64,${base64data}`;
      imgPreview.style.display = 'block';

      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        showStatusError('Please add an API key to enable image analysis.');
        await openApiKeyDialog();
      } else {
        await generatePromptFromImage(base64data, apiKey);
      }
    } else {
      fileNameEl.textContent = 'No file chosen';
      base64data = '';
      imgPreview.style.display = 'none';
    }
  });

  generateButton.addEventListener('click', startGeneration);

  createPromptButton.addEventListener('click', async () => {
    const prompt = await assemblePrompt();
    if (prompt) {
      statusEl.innerText = 'Prompt assembled successfully.';
    } else if (!statusEl.textContent?.includes('Error')) {
      showStatusError(
        'No options selected. Please choose from the selectors above.',
      );
    }
  });

  copyPromptButton.addEventListener('click', () => {
    const displayPrompt = finalPromptOutput.value;
    if (displayPrompt) {
      // Clean the prompt for copying, removing the [category] prefixes
      const apiPrompt = displayPrompt
        .split('\n')
        .map((line) => {
          const closingBracketIndex = line.indexOf('] ');
          if (closingBracketIndex !== -1) {
            return line.substring(closingBracketIndex + 2);
          }
          return line;
        })
        .filter((part) => part.trim() !== '')
        .join(', ');

      navigator.clipboard.writeText(apiPrompt);
      statusEl.innerText = 'Prompt copied to clipboard!';
      setTimeout(() => {
        statusEl.innerText = '';
      }, 2000);
    } else {
      showStatusError('There is no prompt to copy.');
    }
  });

  // --- Initial Setup ---
  initPromptBuilder();
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', main);
