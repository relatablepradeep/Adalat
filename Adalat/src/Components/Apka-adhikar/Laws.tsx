import React, { useState, useEffect } from 'react';
import { ChevronRight, Scale, Book, Shield, Gavel, FileText, Users, Calculator, ChevronLeft } from 'lucide-react';
import articlesJSON from './Rules/Articles/Articles.json';
import surakshaJSON from './Rules/bhartiya-nagrink-suraksa-sanhita/BhartiyaNagrikSuraksaSanhita.json';
import nyayJSON from './Rules/bhartiya-nayy-sanhita/BhartiyaNayySanhita.json';
import ipcJSON from './Rules/IPC/ipc.json';
import personalLawJSON from './Rules/personal-law/personalLaw.json';
import specialActsJSON from './Rules/special-acts/SpecialActs.json';
import taxLawJSON from './Rules/tax-laws/taxAndLaw.json';

const ITEMS_PER_PAGE = 10;

const Laws = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lawFiles = [
    { 
      key: 'articles', 
      name: 'Articles from Constitution of India', 
      data: articlesJSON.constitution_of_india || [],
      icon: Book,
      color: 'from-purple-500 to-pink-500',
      accent: 'purple'
    },
    { 
      key: 'suraksha', 
      name: 'Bharatiya Nagarik Suraksha Sanhita', 
      data: surakshaJSON.chapters || [],
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      accent: 'blue'
    },
    { 
      key: 'nyay', 
      name: 'Bhartiya Nyay Sanhita', 
      data: nyayJSON.chapters || [],
      icon: Gavel,
      color: 'from-green-500 to-emerald-500',
      accent: 'green'
    },
    { 
      key: 'ipc', 
      name: 'IPC Data', 
      data: ipcJSON || [],
      icon: Scale,
      color: 'from-red-500 to-orange-500',
      accent: 'red'
    },
    { 
      key: 'personal', 
      name: 'Personal Laws', 
      data: personalLawJSON.personal_laws || [],
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      accent: 'indigo'
    },
    { 
      key: 'special', 
      name: 'Special Acts', 
      data: specialActsJSON.acts || [],
      icon: FileText,
      color: 'from-yellow-500 to-orange-500',
      accent: 'yellow'
    },
    { 
      key: 'tax', 
      name: 'Tax Laws', 
      data: taxLawJSON || {},
      icon: Calculator,
      color: 'from-teal-500 to-green-500',
      accent: 'teal'
    }
  ];

  const [selectedKey, setSelectedKey] = useState(null);

  // Keep pagination state for each dataset by key
  const [pages, setPages] = useState({
    articles: 1,
    suraksha: 1,
    nyay: 1,
    ipc: 1,
    personal: 1,
    special: 1,
    taxAdmin: 1,
    taxTax: 1,
  });

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  // Handle file selection
  const handleSelect = (key) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedKey(key);
      setPages((prev) => ({
        ...prev,
        [key]: 1,
        taxAdmin: 1,
        taxTax: 1,
      }));
      setIsLoading(false);
    }, 500);
  };

  // Generic paginate function
  const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const getAccentColor = (accent) => {
    const colors = {
      purple: 'border-purple-400 shadow-purple-500/25',
      blue: 'border-blue-400 shadow-blue-500/25',
      green: 'border-green-400 shadow-green-500/25',
      red: 'border-red-400 shadow-red-500/25',
      indigo: 'border-indigo-400 shadow-indigo-500/25',
      yellow: 'border-yellow-400 shadow-yellow-500/25',
      teal: 'border-teal-400 shadow-teal-500/25'
    };
    return colors[accent] || 'border-gray-400 shadow-gray-500/25';
  };

  // Render page numbers like Amazon style (with max 5 pages shown)
  const renderPageNumbers = (dataLength, currentPage, onPageChange) => {
    const totalPages = Math.ceil(dataLength / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 flex items-center space-x-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {startPage > 1 && (
          <>
            <button 
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              num === currentPage 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button 
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 flex items-center space-x-1"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderArticles = (data) => {
    const page = pages.articles;
    const pageData = paginate(data, page);
    return (
      <>
        {pageData.map((article, idx) => (
          <div key={idx} className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-purple-300 mb-3">
              Article {article.article_number}: {article.article_name}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">{article.original_text}</p>
            {article.amendments?.length > 0 && (
              <>
                <h4 className="text-lg font-semibold text-pink-300 mb-2">Amendments:</h4>
                <ul className="space-y-2">
                  {article.amendments.map((am, i) => (
                    <li key={i} className="p-3 rounded-lg bg-black/20">
                      <strong className="text-purple-400">{am.amendment_number}</strong> 
                      <span className="text-gray-400"> ({am.date}): </span>
                      <span className="text-gray-300">{am.description}</span>
                      <p className="italic text-gray-400 mt-2">{am.updated_text}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
        {renderPageNumbers(data.length, page, (p) => setPages((prev) => ({ ...prev, articles: p })))}
      </>
    );
  };

  const renderSurakshaOrNyay = (data, key) => {
    const page = pages[key];
    const pageData = paginate(data, page);
    const colorClass = key === 'suraksha' ? 'from-blue-500/10 to-cyan-500/10' : 'from-green-500/10 to-emerald-500/10';
    const titleColor = key === 'suraksha' ? 'text-blue-300' : 'text-green-300';
    
    return (
      <>
        {pageData.map((chapter, cIdx) => (
          <div key={cIdx} className={`mb-8 p-6 rounded-xl bg-gradient-to-r ${colorClass} border border-white/10 backdrop-blur-sm`}>
            <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>
              Chapter {chapter.chapter_number}: {chapter.chapter_name}
            </h2>
            {chapter.sections?.map((section, sIdx) => (
              <div key={sIdx} className="ml-4 mb-4 p-4 rounded-lg bg-black/20">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Section {section.section_number}: {section.section_title}
                </h4>
                <p className="text-gray-300 leading-relaxed">{section.section_text}</p>
              </div>
            ))}
          </div>
        ))}
        {renderPageNumbers(data.length, page, (p) => setPages((prev) => ({ ...prev, [key]: p })))}
      </>
    );
  };

  const renderIPC = (data) => {
    const page = pages.ipc;
    const pageData = paginate(data, page);
    return (
      <>
        {pageData.map((chapter, chIdx) => (
          <div key={chIdx} className="mb-8 p-6 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-red-300 mb-2">Chapter: {chapter.chapter}</h3>
            <h4 className="text-xl font-semibold text-orange-300 mb-4">{chapter.title}</h4>
            {chapter.sections?.map((section, sIdx) => (
              <div key={sIdx} className="ml-4 mb-4 p-4 rounded-lg bg-black/20">
                <h5 className="text-lg font-semibold text-white mb-2">
                  Section {section.section}: {section.title}
                </h5>
                <p className="text-gray-300 leading-relaxed mb-3">{section.text}</p>
                {section.amendments?.length > 0 && (
                  <ul className="space-y-2">
                    {section.amendments.map((am, i) => (
                      <li key={i} className="p-3 rounded-lg bg-black/30">
                        <strong className="text-red-400">{am.amendment_number}</strong>
                        <span className="text-gray-400"> ({am.date}): </span>
                        <span className="text-gray-300">{am.description}</span>
                        <p className="italic text-gray-400 mt-2">{am.updated_text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
        {renderPageNumbers(data.length, page, (p) => setPages((prev) => ({ ...prev, ipc: p })))}
      </>
    );
  };

  const renderPersonal = (data) => {
    const page = pages.personal;
    const pageData = paginate(data, page);
    return (
      <>
        {pageData.map((entry, i) => (
          <div key={i} className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-indigo-300 mb-4">Religion: {entry.religion}</h3>
            {Object.entries(entry.laws).map(([topic, law]) => (
              <div key={topic} className="ml-4 mb-4 p-4 rounded-lg bg-black/20">
                <h4 className="text-lg font-semibold text-purple-300 mb-2">
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </h4>
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Act Name:</strong> {law.act_name}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Description:</strong> {law.description}
                </p>
              </div>
            ))}
          </div>
        ))}
        {renderPageNumbers(data.length, page, (p) => setPages((prev) => ({ ...prev, personal: p })))}
      </>
    );
  };









  const renderSpecial = (data) => {
  const page = pages.ipc;
  const pageData = paginate(data, page);

  return (
    <>
      {pageData.map((acts, k) => (
        <div
          key={k}
          className="mb-8 p-6 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-white/10 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-red-300 mb-2">Chapter: {acts.name}</h3>
          <h4 className="text-xl font-semibold text-orange-300 mb-4">{acts.prompt}</h4>

          <div className="ml-4 mb-4 p-4 rounded-lg bg-black/20">
            {acts.details?.purpose && (
              <h5 className="text-lg font-semibold text-white mb-2">
                Purpose: <span className="text-gray-300 font-normal">{acts.details.purpose}</span>
              </h5>
            )}

            {!!acts.details?.key_provisions?.length && (
              <div className="mb-3">
                <h5 className="text-lg font-semibold text-white">Key Provisions:</h5>
                <ul className="list-disc list-inside text-gray-300">
                  {acts.details.key_provisions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!acts.details?.punishments?.length && (
              <div className="mb-3">
                <h5 className="text-lg font-semibold text-white">Punishments:</h5>
                <ul className="list-disc list-inside text-gray-300">
                  {acts.details.punishments.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {acts.details?.additional_information && (
              <div className="space-y-3 mt-4">
                {!!acts.details.additional_information.enforcing_authorities?.length && (
                  <div>
                    <h5 className="text-lg font-semibold text-white">Enforcing Authorities:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {acts.details.additional_information.enforcing_authorities.map((auth, idx) => (
                        <li key={idx}>{auth}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!acts.details.additional_information.amendments?.length && (
                  <div>
                    <h5 className="text-lg font-semibold text-white">Amendments:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {acts.details.additional_information.amendments.map((amendment, idx) => (
                        <li key={idx}>{amendment}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!acts.details.additional_information.notable_cases?.length && (
                  <div>
                    <h5 className="text-lg font-semibold text-white">Notable Cases:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {acts.details.additional_information.notable_cases.map((caseItem, idx) => (
                        <li key={idx}>{caseItem}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {renderPageNumbers(data.length, page, (p) => setPages((prev) => ({ ...prev, ipc: p })))}
    </>
  );
};



























  const renderTax = (data) => {
    if (!data.administrative_and_tax_laws) return <p className="text-gray-300">No data available</p>;

    const adminLaws = data.administrative_and_tax_laws.administrative_laws || [];
    const taxLaws = data.administrative_and_tax_laws.tax_laws || [];

    const adminPage = pages.taxAdmin;
    const taxPage = pages.taxTax;

    const pagedAdmin = paginate(adminLaws, adminPage);
    const pagedTax = paginate(taxLaws, taxPage);

    return (
      <>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-teal-300 mb-6">Administrative Laws</h3>
          {pagedAdmin.map((law, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-white/10">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Act Name:</strong> {law.act_name}
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Year:</strong> {law.year}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">Purpose:</strong> {law.purpose}
              </p>
            </div>
          ))}
          {renderPageNumbers(adminLaws.length, adminPage, (p) => setPages((prev) => ({ ...prev, taxAdmin: p })))}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-green-300 mb-6">Tax Laws</h3>
          {pagedTax.map((law, i) => (
            <div key={i} className="mb-6 p-6 rounded-xl bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-white/10 backdrop-blur-sm">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Act Name:</strong> {law.act_name}
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Year:</strong> {law.year}
              </p>
              <p className="text-gray-300 mb-4">
                <strong className="text-white">Purpose:</strong> {law.purpose}
              </p>
              
              <h4 className="text-lg font-semibold text-teal-300 mb-3">Key Provisions:</h4>
              <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                {law.key_provisions.map((kp, idx) => (
                  <li key={idx} className="text-gray-300">{kp}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-semibold text-teal-300 mb-3">Penalties:</h4>
              <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                {law.penalties.map((pen, idx) => (
                  <li key={idx} className="text-gray-300">{pen}</li>
                ))}
              </ul>
              
              <p className="text-gray-300 mb-4">
                <strong className="text-white">Admin Authority:</strong> {law.administrative_authority.name} ({law.administrative_authority.role})
              </p>
              
              <h4 className="text-lg font-semibold text-green-300 mb-3">Recent Amendments:</h4>
              <ul className="space-y-2">
                {law.recent_amendments.map((am, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-black/20 text-gray-300">
                    <strong className="text-green-400">{am.year}:</strong> {am.details}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {renderPageNumbers(taxLaws.length, taxPage, (p) => setPages((prev) => ({ ...prev, taxTax: p })))}
        </div>
      </>
    );
  };

  const renderData = () => {
    if (!selectedKey) return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-bounce mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
            <Scale className="w-16 h-16 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Welcome to Legal Hub! 🚀
        </h2>
        <p className="text-xl text-gray-300 max-w-md">
          Select a legal document from the sidebar to explore the law like never before
        </p>
        <div className="mt-8 flex space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    );

    const file = lawFiles.find((f) => f.key === selectedKey);
    if (!file) return <p className="text-gray-300">Invalid selection</p>;

    switch (selectedKey) {
      case 'articles': return renderArticles(file.data);
      case 'suraksha': return renderSurakshaOrNyay(file.data, 'suraksha');
      case 'nyay': return renderSurakshaOrNyay(file.data, 'nyay');
      case 'ipc': return renderIPC(file.data);
      case 'personal': return renderPersonal(file.data);
      case 'special': return renderSpecial(file.data);
      case 'tax': return renderTax(file.data);
      default: return <p className="text-gray-300">No renderer implemented for this file.</p>;
    }
  };

  const selectedFile = lawFiles.find(f => f.key === selectedKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-80 backdrop-blur-md bg-black/20 border-r border-white/10 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Legal Hub ⚖️
            </h1>
            <p className="text-gray-300 text-sm">Choose your legal adventure</p>
          </div>

          <div className="space-y-4">
            {lawFiles.map((file, index) => {
              const IconComponent = file.icon;
              return (
                <div
                  key={file.key}
                  className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    animateCards ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleSelect(file.key)}
                >
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${file.color} p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    selectedKey === file.key ? `ring-2 ring-white/50 ${getAccentColor(file.accent)}` : ''
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-white/80">
                          {Array.isArray(file.data) ? file.data.length : 'Multiple'} items
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selectedFile && (
            <div className={`transform transition-all duration-500 mb-6 ${isLoading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedFile.color} shadow-lg`}>
                  <selectedFile.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {selectedFile.name}
                  </h2>
                  <p className="text-gray-300">
                    {Array.isArray(selectedFile.data) ? selectedFile.data.length : 'Multiple'} items found
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-500 rounded-full animate-spin animation-delay-200"></div>
              </div>
            </div>
          ) : (
            <div className="backdrop-blur-md bg-black/10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-6">
                {renderData()}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  );
};

export default Laws;